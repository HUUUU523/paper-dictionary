from __future__ import annotations

import json
import os
import re
from pathlib import Path
from urllib.parse import quote

import requests
from flask import Flask, jsonify, render_template, request

BASE_DIR = Path(__file__).resolve().parent
CONFIG_PATH = BASE_DIR / "config.json"

DASHSCOPE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
EN_DICT_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

app = Flask(__name__)
application = app


# ---------------- 配置读写 ----------------

def load_config() -> dict:
    if CONFIG_PATH.exists():
        try:
            return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            pass
    return {}


def save_config(cfg: dict) -> None:
    CONFIG_PATH.write_text(
        json.dumps(cfg, ensure_ascii=False, indent=2), encoding="utf-8"
    )


# ---------------- 页面 ----------------

@app.get("/")
def index():
    return render_template("index.html")


# ---------------- 设置 ----------------

@app.get("/api/settings")
def get_settings():
    cfg = load_config()
    return jsonify({
        "model": cfg.get("model", "qwen-plus"),
        "hasKey": bool(cfg.get("apiKey")),
    })


@app.post("/api/settings")
def post_settings():
    data = request.get_json(force=True, silent=True) or {}
    cfg = load_config()

    key = (data.get("apiKey") or "").strip()
    if key:
        cfg["apiKey"] = key
    if data.get("model"):
        cfg["model"] = data["model"]

    save_config(cfg)
    return jsonify({
        "ok": True,
        "model": cfg.get("model", "qwen-plus"),
        "hasKey": bool(cfg.get("apiKey")),
    })


# ---------------- 英文查词 ----------------

@app.post("/api/lookup/en")
def lookup_en():
    data = request.get_json(force=True, silent=True) or {}
    word = (data.get("word") or "").strip()
    if not word:
        return jsonify({"error": "请输入英文单词。"}), 400

    try:
        resp = requests.get(EN_DICT_URL + quote(word), timeout=20)
    except requests.RequestException as exc:
        return jsonify({"error": f"连接英文词典失败：{exc}"}), 502

    if resp.status_code == 404:
        return jsonify({"error": f"未找到「{word}」，请检查拼写。"}), 404
    if resp.status_code != 200:
        return jsonify({"error": f"英文词典请求失败（HTTP {resp.status_code}）。"}), 502

    try:
        payload = resp.json()
    except ValueError:
        return jsonify({"error": "英文词典返回了无法解析的内容。"}), 502

    if not isinstance(payload, list) or not payload:
        return jsonify({"error": f"未找到「{word}」。"}), 404

    entry = payload[0]

    phonetic = entry.get("phonetic") or ""
    if not phonetic:
        for p in entry.get("phonetics") or []:
            if p.get("text"):
                phonetic = p["text"]
                break

    cfg = load_config()
    api_key = cfg.get("apiKey")
    model = cfg.get("model", "qwen-plus")

    meanings = []
    for m in entry.get("meanings") or []:
        definitions = []
        for d in (m.get("definitions") or []):
            definition = d.get("definition") or ""
            chinese = translate_to_chinese(definition, api_key, model) if definition else ""
            definitions.append({
                "definition": definition,
                "example": d.get("example") or "",
                "chinese": chinese,
            })
        meanings.append({
            "partOfSpeech": m.get("partOfSpeech") or "",
            "definitions": definitions,
        })

    return jsonify({
        "type": "en",
        "word": entry.get("word") or word,
        "phonetic": phonetic,
        "meanings": meanings,
        "source": "dictionaryapi.dev",
    })


# ---------------- 英文释义中文翻译 ----------------

def translate_to_chinese(text: str, api_key: str, model: str) -> str:
    if not text or not api_key:
        return ""

    body = {
        "model": model,
        "messages": [{
            "role": "user",
            "content": (
                "请将下面这段英文词典释义翻译成简体中文，"
                "只输出中文，不要解释，也不要额外标记：\n"
                f"{text}"
            ),
        }],
        "temperature": 0.2,
    }

    try:
        resp = requests.post(
            DASHSCOPE_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json=body,
            timeout=60,
        )
    except requests.RequestException:
        return ""

    if resp.status_code != 200:
        return ""

    try:
        content = resp.json()["choices"][0]["message"]["content"]
    except (KeyError, IndexError, ValueError):
        return ""

    return str(content).strip().strip("`\"' \n\t")


# ---------------- 中文 / 文言文查词 ----------------

def build_prompt(word: str, lang: str) -> str:
    lang_name = "文言文（古汉语）" if lang == "wenyan" else "现代汉语"
    if lang == "wenyan":
        extra = (
            '- "classicalUsage": 该字/词在文言文中的典型用法说明（现代汉语）\n'
            '- "classicalExamples": 至少 2 条古籍例句，每条含 "quote"（原文）、'
            '"source"（书名·篇名，如《论语·学而》）、"gloss"（白话翻译）'
        )
    else:
        extra = (
            '- "classicalUsage": 若有文言用法或古义则说明，否则填空字符串 ""\n'
            '- "classicalExamples": 若有古籍用例给 1-2 条，否则返回空数组 []'
        )

    return f"""你是一位严谨的汉语词典编纂者。请为{lang_name}字词「{word}」编纂词典条目，以 JSON 对象返回。

字段要求：
- "headword": 条目字/词
- "pinyin": 拼音（带声调；多音字用中文分号「；」分隔，如「zhī；zhì」）
- "senses": 义项数组，按常用程度排序。每项含：
  - "definition": 释义
  - "example": 现代汉语例句（可为空字符串）
  - "synonyms": 近义词数组（可为空数组）
  - "antonyms": 反义词数组（可为空数组）
- "compounds": 由该字/词组成的常用词语数组（5-10 个）
{extra}

只输出 JSON，不要 Markdown 代码块标记，不要任何解释文字。"""


def extract_json(text: str) -> dict:
    text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    fenced = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if fenced:
        try:
            return json.loads(fenced.group(1))
        except json.JSONDecodeError:
            pass

    start, end = text.find("{"), text.rfind("}")
    if start != -1 and end > start:
        return json.loads(text[start:end + 1])

    raise ValueError("无法从模型返回中解析出 JSON")


@app.post("/api/lookup/zh")
def lookup_zh():
    data = request.get_json(force=True, silent=True) or {}
    word = (data.get("word") or "").strip()
    lang = data.get("lang", "zh")

    if not word:
        return jsonify({"error": "请输入要查阅的字 / 词。"}), 400
    if lang not in ("zh", "wenyan"):
        return jsonify({"error": "语种参数无效。"}), 400

    cfg = load_config()
    api_key = cfg.get("apiKey")
    if not api_key:
        return jsonify({"error": "服务器尚未配置千问 API Key，请点击右上角 ⚙ 填写。"}), 400

    model = cfg.get("model", "qwen-plus")
    body = {
        "model": model,
        "messages": [{"role": "user", "content": build_prompt(word, lang)}],
        "response_format": {"type": "json_object"},
        "temperature": 0.3,
    }

    try:
        resp = requests.post(
            DASHSCOPE_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json=body,
            timeout=90,
        )
    except requests.RequestException as exc:
        return jsonify({"error": f"连接千问 API 失败：{exc}"}), 502

    if resp.status_code == 401:
        return jsonify({"error": "API Key 无效或已过期，请重新填写。"}), 401
    if resp.status_code == 429:
        return jsonify({"error": "请求过于频繁，请稍后再试。"}), 429
    if resp.status_code != 200:
        detail = resp.text[:300]
        try:
            j = resp.json()
            detail = (j.get("error") or {}).get("message") or j.get("message") or detail
        except ValueError:
            pass
        return jsonify({"error": f"千问 API 请求失败（HTTP {resp.status_code}）：{detail}"}), 502

    try:
        content = resp.json()["choices"][0]["message"]["content"]
    except (KeyError, IndexError, ValueError):
        return jsonify({"error": "千问 API 返回结构异常。"}), 502

    try:
        parsed = extract_json(content)
    except (ValueError, json.JSONDecodeError):
        return jsonify({"error": "无法解析千问返回的 JSON，请重试。"}), 502

    return jsonify({
        "type": lang,
        "headword": parsed.get("headword") or word,
        "pinyin": parsed.get("pinyin") or "",
        "senses": parsed.get("senses") or [],
        "compounds": parsed.get("compounds") or [],
        "classicalUsage": parsed.get("classicalUsage") or "",
        "classicalExamples": parsed.get("classicalExamples") or [],
        "source": f"千问 · {model}",
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", "5000")),
        debug=False,
    )
