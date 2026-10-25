(() => {
  'use strict';

  /* ---------- 字体清单（110+ 选项，按栈生效，零下载） ---------- */
  const FONT_STACKS = [
    ['系统默认（无衬线）', '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif'],
    ['系统衬线（书卷气）', '"Songti SC", "SimSun", "Noto Serif SC", Georgia, serif'],
    ['苹方 / 微软雅黑', '"PingFang SC", "Microsoft YaHei", sans-serif'],
    ['宋体', 'SimSun, "Songti SC", serif'],
    ['黑体', 'SimHei, "Heiti SC", sans-serif'],
    ['楷体', 'KaiTi, "Kaiti SC", STKaiti, serif'],
    ['仿宋', 'FangSong, STFangsong, serif'],
    ['隶书', 'LiSu, STLiti, serif'],
    ['幼圆', 'YouYuan, "Yuanti SC", sans-serif'],
    ['华文细黑', 'STXihei, "Microsoft YaHei", sans-serif'],
    ['华文琥珀', 'STHupo, "Microsoft YaHei", sans-serif'],
    ['华文彩云', 'STCaiyun, "Microsoft YaHei", sans-serif'],
    ['华文行楷', 'STXingkai, "Kaiti SC", serif'],
    ['华文新魏', 'STXinwei, "Kaiti SC", serif'],
    ['华文隶书', 'STLiti, LiSu, serif'],
    ['方正舒体', 'FZShuTi, "Kaiti SC", cursive'],
    ['方正姚体', 'FZYaoTi, "Songti SC", serif'],
    ['Georgia（英文衬线）', 'Georgia, "Times New Roman", serif'],
    ['Times New Roman（英文）', '"Times New Roman", Times, serif'],
    ['Garamond（英文古典）', 'Garamond, Georgia, serif'],
    ['Palatino（英文）', '"Palatino Linotype", Palatino, serif'],
    ['Baskerville（英文）', 'Baskerville, "Times New Roman", serif'],
    ['Didot（英文展示）', 'Didot, "Bodoni MT", serif'],
    ['Bodoni（英文）', '"Bodoni MT", Didot, serif'],
    ['Optima（英文人文）', 'Optima, "Segoe UI", sans-serif'],
    ['Futura（英文几何）', 'Futura, "Century Gothic", sans-serif'],
    ['Avenir（英文现代）', 'Avenir, "Segoe UI", sans-serif'],
    ['Gill Sans（英文）', '"Gill Sans", "Trebuchet MS", sans-serif'],
    ['Trebuchet MS（英文）', '"Trebuchet MS", sans-serif'],
    ['Verdana（英文易读）', 'Verdana, Geneva, sans-serif'],
    ['Tahoma（英文）', 'Tahoma, Geneva, sans-serif'],
    ['Segoe UI（Windows 默认）', '"Segoe UI", system-ui, sans-serif'],
    ['Calibri（Office 默认）', 'Calibri, "Segoe UI", sans-serif'],
    ['Candara（英文）', 'Candara, "Segoe UI", sans-serif'],
    ['Corbel（英文）', 'Corbel, "Segoe UI", sans-serif'],
    ['Constantia（英文）', 'Constantia, Georgia, serif'],
    ['Cambria（英文）', 'Cambria, Georgia, serif'],
    ['Consolas（等宽）', 'Consolas, "Courier New", monospace'],
    ['Courier New（等宽）', '"Courier New", Courier, monospace'],
    ['Menlo / Monaco（Mac 等宽）', 'Menlo, Monaco, Consolas, monospace'],
    ['Lucida Console（等宽）', '"Lucida Console", Monaco, monospace'],
    ['Andale Mono（等宽）', '"Andale Mono", Consolas, monospace'],
    ['Noto Sans SC（思源黑体）', '"Noto Sans SC", "Microsoft YaHei", sans-serif'],
    ['Noto Serif SC（思源宋体）', '"Noto Serif SC", "Songti SC", serif'],
    ['Source Han Sans（思源黑体）', '"Source Han Sans SC", "Noto Sans SC", sans-serif'],
    ['Source Han Serif（思源宋体）', '"Source Han Serif SC", "Noto Serif SC", serif'],
    ['PingFang SC Light', '"PingFang SC", "Microsoft YaHei", sans-serif'],
    ['PingFang SC Medium', '"PingFang SC", "Microsoft YaHei", sans-serif'],
    ['Microsoft JhengHei（繁体）', '"Microsoft JhengHei", "PingFang TC", sans-serif'],
    ['MingLiU（繁体明体）', 'MingLiU, "Songti TC", serif'],
    ['DFKai-SB（繁体楷书）', 'DFKai-SB, KaiTi, serif'],
    ['ZCOOL XiaoWei（站酷小薇）', '"ZCOOL XiaoWei", "Songti SC", serif'],
    ['ZCOOL QingKe HuangYou', '"ZCOOL QingKe HuangYou", "Microsoft YaHei", sans-serif'],
    ['ZCOOL KuaiLe（站酷快乐）', '"ZCOOL KuaiLe", "Microsoft YaHei", cursive'],
    ['Ma Shan Zheng（马善政楷书）', '"Ma Shan Zheng", KaiTi, cursive'],
    ['Long Cang（龙藏手写）', '"Long Cang", KaiTi, cursive'],
    ['Zhi Mang Xing（志莽行书）', '"Zhi Mang Xing", STXingkai, cursive'],
    ['Liu Jian Mao Cao（刘建毛草）', '"Liu Jian Mao Cao", STXingkai, cursive'],
    ['LXGW WenKai（霞鹜文楷）', '"LXGW WenKai", "Kaiti SC", serif'],
    ['LXGW WenKai Light', '"LXGW WenKai", "Kaiti SC", serif'],
    ['Smiley Sans（得意黑）', '"Smiley Sans", "Microsoft YaHei", sans-serif'],
    ['HarmonyOS Sans SC', '"HarmonyOS Sans SC", "Microsoft YaHei", sans-serif'],
    ['MiSans（小米）', 'MiSans, "Microsoft YaHei", sans-serif'],
    ['Alibaba PuHuiTi（阿里巴巴普惠体）', '"Alibaba PuHuiTi", "Microsoft YaHei", sans-serif'],
    ['OPPO Sans', '"OPPO Sans", "Microsoft YaHei", sans-serif'],
    ['vivo Sans', '"vivo Sans", "Microsoft YaHei", sans-serif'],
    ['HONOR Sans', '"HONOR Sans", "Microsoft YaHei", sans-serif'],
    ['Helvetica Neue', '"Helvetica Neue", Helvetica, Arial, sans-serif'],
    ['Arial', 'Arial, Helvetica, sans-serif'],
    ['Arial Black', '"Arial Black", Arial, sans-serif'],
    ['Franklin Gothic Medium', '"Franklin Gothic Medium", Arial, sans-serif'],
    ['Century Gothic', '"Century Gothic", Futura, sans-serif'],
    ['Copperplate', 'Copperplate, "Times New Roman", serif'],
    ['Rockwell（英文板衬线）', 'Rockwell, "Courier New", serif'],
    ['American Typewriter', '"American Typewriter", "Courier New", serif'],
    ['Chalkboard（英文手写感）', 'Chalkboard, "Comic Sans MS", cursive'],
    ['Comic Sans MS', '"Comic Sans MS", cursive'],
    ['Brush Script MT（英文书法）', '"Brush Script MT", cursive'],
    ['Papyrus（英文手写）', 'Papyrus, fantasy'],
    ['Impact（英文标题）', 'Impact, "Arial Black", sans-serif'],
    ['Trebuchet MS Italic', '"Trebuchet MS", sans-serif'],
    ['Verdana Italic', 'Verdana, sans-serif'],
    ['Georgia Italic', 'Georgia, serif'],
    ['Palatino Italic', 'Palatino, serif'],
    ['Book Antiqua', '"Book Antiqua", Palatino, serif'],
    ['Bookman Old Style', '"Bookman Old Style", Georgia, serif'],
    ['Century Schoolbook', '"Century Schoolbook", Georgia, serif'],
    ['Goudy Old Style', '"Goudy Old Style", Georgia, serif'],
    ['Perpetua', 'Perpetua, Georgia, serif'],
    ['Sylfaen', 'Sylfaen, Georgia, serif'],
    ['Euphemia', 'Euphemia, "Microsoft YaHei", sans-serif'],
    ['Leelawadee UI', '"Leelawadee UI", "Microsoft YaHei", sans-serif'],
    ['Malgun Gothic（韩文）', '"Malgun Gothic", "Microsoft YaHei", sans-serif'],
    ['Yu Gothic（日文）', '"Yu Gothic", "Microsoft YaHei", sans-serif'],
    ['Meiryo（日文明朝）', 'Meiryo, "Microsoft YaHei", sans-serif'],
    ['MS Gothic（日文等宽）', '"MS Gothic", monospace'],
    ['Hiragino Sans（日文）', '"Hiragino Sans", "PingFang SC", sans-serif'],
    ['Hiragino Mincho ProN（日文明朝）', '"Hiragino Mincho ProN", "Songti SC", serif'],
    ['Songti TC（繁体宋）', '"Songti TC", "Songti SC", serif'],
    ['Kaiti TC（繁体楷）', '"Kaiti TC", KaiTi, serif'],
    ['Heiti TC（繁体黑）', '"Heiti TC", "Microsoft JhengHei", sans-serif'],
    ['Yuanti TC（繁体圆体）', '"Yuanti TC", "Yuanti SC", sans-serif'],
    ['Apple Symbols', '"Apple Symbols", "Segoe UI Symbol", sans-serif'],
    ['Segoe UI Symbol', '"Segoe UI Symbol", "Apple Symbols", sans-serif'],
    ['Segoe UI Historic', '"Segoe UI Historic", "Segoe UI Symbol", sans-serif'],
    ['Cascadia Code（等宽）', '"Cascadia Code", Consolas, monospace'],
    ['Cascadia Mono（等宽）', '"Cascadia Mono", Consolas, monospace'],
    ['JetBrains Mono（等宽）', '"JetBrains Mono", Consolas, monospace'],
    ['Fira Code（等宽）', '"Fira Code", Consolas, monospace'],
    ['IBM Plex Mono（等宽）', '"IBM Plex Mono", Consolas, monospace'],
    ['Source Code Pro（等宽）', '"Source Code Pro", Consolas, monospace'],
    ['Ubuntu Mono（等宽）', '"Ubuntu Mono", Consolas, monospace'],
    ['Inconsolata（等宽）', 'Inconsolata, Consolas, monospace'],
    ['Anonymous Pro（等宽）', '"Anonymous Pro", Consolas, monospace'],
    ['PT Mono（等宽）', '"PT Mono", Consolas, monospace'],
    ['Roboto Mono（等宽）', '"Roboto Mono", Consolas, monospace'],
  ];

  const FONT_STORAGE_KEY = 'paper-dict-font';

  const state = {
    lang: 'zh',
    model: 'qwen-plus',
    hasKey: false,
    fontStack: FONT_STACKS[0][1],
    busy: false,
  };

  const $ = (id) => document.getElementById(id);
  const queryInput = $('queryInput');
  const searchBtn = $('searchBtn');
  const statusEl = $('status');
  const resultEl = $('result');
  const fontSelect = $('fontSelect');
  const settingsOverlay = $('settingsOverlay');
  const apiKeyInput = $('apiKeyInput');
  const modelSelect = $('modelSelect');
  const fontPreview = $('fontPreview');
  const keyHint = $('keyHint');

  /* ---------- 工具 ---------- */
  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }
  function senseNo(n) {
    const circled = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱','⑲','⑳'];
    return circled[n - 1] || '(' + n + ')';
  }
  function setStatus(msg, isError) {
    statusEl.textContent = msg || '';
    statusEl.className = 'status' + (isError ? ' error' : '');
  }

  /* ---------- 字体 ---------- */
  function initFontSelect() {
    FONT_STACKS.forEach(([label], i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = label;
      fontSelect.appendChild(opt);
    });
    const saved = localStorage.getItem(FONT_STORAGE_KEY);
    if (saved) state.fontStack = saved;
    const idx = FONT_STACKS.findIndex(([, s]) => s === state.fontStack);
    fontSelect.value = idx >= 0 ? idx : 0;
    applyFont(FONT_STACKS[fontSelect.value][1]);
    fontPreview.style.fontFamily = FONT_STACKS[fontSelect.value][1];

    fontSelect.addEventListener('change', () => {
      const stack = FONT_STACKS[fontSelect.value][1];
      applyFont(stack);
      fontPreview.style.fontFamily = stack;
    });
  }
  function applyFont(stack) {
    document.documentElement.style.setProperty('--font-main', stack);
  }

  /* ---------- 设置 ---------- */
  async function loadSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      state.model = data.model || 'qwen-plus';
      state.hasKey = !!data.hasKey;
    } catch (_) {}
  }
  function refreshSettingsUI() {
    modelSelect.value = state.model;
    apiKeyInput.value = '';
    if (state.hasKey) {
      apiKeyInput.placeholder = '已配置，留空则不修改';
      keyHint.textContent = '服务器已保存 API Key。留空保存可保持不变，填入新值则覆盖。';
    } else {
      apiKeyInput.placeholder = 'sk-…';
      keyHint.textContent = '从阿里云百炼 / DashScope 控制台获取，保存在服务器端 config.json。';
    }
  }
  function openSettings() {
    refreshSettingsUI();
    settingsOverlay.classList.add('open');
  }
  function closeSettings() { settingsOverlay.classList.remove('open'); }

  async function saveSettings() {
    const payload = { model: modelSelect.value };
    const key = apiKeyInput.value.trim();
    if (key) payload.apiKey = key;

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      state.model = data.model;
      state.hasKey = !!data.hasKey;
    } catch (err) {
      setStatus('保存设置失败：' + err.message, true);
      return;
    }

    state.fontStack = FONT_STACKS[fontSelect.value][1];
    localStorage.setItem(FONT_STORAGE_KEY, state.fontStack);

    closeSettings();
    setStatus('设置已保存。', false);
  }

  /* ---------- 语言切换 ---------- */
  document.querySelectorAll('#langTabs button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#langTabs button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.lang = btn.dataset.lang;
      queryInput.placeholder = {
        en: '输入英文单词…',
        zh: '输入汉字或词语…',
        wenyan: '输入文言字 / 词，如「之」「去」…',
      }[state.lang];
    });
  });

  /* ---------- 渲染 ---------- */
  function renderEnglish(entry) {
    let html = '<div class="entry">';
    html += '<div class="entry-head">' +
      '<span class="entry-word en">' + escapeHtml(entry.word) + '</span>' +
      '<button class="speak-btn" type="button" data-speak="' + escapeHtml(entry.word) + '" title="朗读单词" aria-label="朗读 ' + escapeHtml(entry.word) + '">🔊</button>' +
      (entry.phonetic ? '<span class="phonetic">' + escapeHtml(entry.phonetic) + '</span>' : '') +
      '</div>';

    let counter = 0;
    (entry.meanings || []).forEach((meaning) => {
      html += '<div class="section"><div class="section-title">释义</div>';
      (meaning.definitions || []).forEach((def) => {
        counter++;
        html += '<div class="sense">' +
          '<span class="sense-no">' + senseNo(counter) + '</span>' +
          '<div class="sense-body">' +
          (meaning.partOfSpeech ? '<span class="pos">' + escapeHtml(meaning.partOfSpeech) + '</span>' : '') +
          '<div class="definition">' + escapeHtml(def.definition) + '</div>' +
          (def.chinese ? '<div class="example" style="border:none;padding-left:0;">中文：' + escapeHtml(def.chinese) + '</div>' : '') +
          (def.example ? '<div class="example">' + escapeHtml(def.example) + '</div>' : '') +
          '</div></div>';
      });
      html += '</div>';
    });

    html += '<div class="meta-line">来源：' + escapeHtml(entry.source) + '</div></div>';
    return html;
  }

  function speakEnglish(word) {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setStatus('当前浏览器不支持语音朗读。', true);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('en-us')) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;
    window.speechSynthesis.speak(utterance);
  }

  function renderChinese(entry) {
    const isWenyan = entry.type === 'wenyan';
    let html = '<div class="entry">';
    html += '<div class="entry-head">' +
      '<span class="entry-word">' + escapeHtml(entry.headword) + '</span>' +
      (entry.pinyin ? '<span class="pinyin">' + escapeHtml(entry.pinyin) + '</span>' : '') +
      '</div>';

    const senses = entry.senses || [];
    if (senses.length) {
      html += '<div class="section"><div class="section-title">释义</div>';
      senses.forEach((sense, i) => {
        const syn = (sense.synonyms || []).filter(Boolean);
        const ant = (sense.antonyms || []).filter(Boolean);
        html += '<div class="sense">' +
          '<span class="sense-no">' + senseNo(i + 1) + '</span>' +
          '<div class="sense-body">' +
          '<div class="definition">' + escapeHtml(sense.definition) + '</div>' +
          (sense.example ? '<div class="example">' + escapeHtml(sense.example) + '</div>' : '') +
          (syn.length ? '<div class="example" style="border:none;padding-left:0;font-size:13px;">近：' + syn.map(escapeHtml).join('、') + '</div>' : '') +
          (ant.length ? '<div class="example" style="border:none;padding-left:0;font-size:13px;">反：' + ant.map(escapeHtml).join('、') + '</div>' : '') +
          '</div></div>';
      });
      html += '</div>';
    }

    const compounds = entry.compounds || [];
    if (compounds.length) {
      html += '<div class="section"><div class="section-title">组词</div><div class="word-chips">' +
        compounds.map((c) => '<span class="chip">' + escapeHtml(c) + '</span>').join('') +
        '</div></div>';
    }

    if (isWenyan && entry.classicalUsage) {
      html += '<div class="section"><div class="section-title">文言用法</div>' +
        '<div class="definition">' + escapeHtml(entry.classicalUsage) + '</div></div>';
    }

    const examples = entry.classicalExamples || [];
    if (examples.length) {
      html += '<div class="section"><div class="section-title">古籍出处</div>';
      examples.forEach((ex) => {
        html += '<div class="example" style="margin-bottom:10px;">' +
          '<div style="color:var(--ink);font-size:15px;font-family:var(--font-heading);">' + escapeHtml(ex.quote) + '</div>' +
          '<span class="src">—— ' + escapeHtml(ex.source) + '</span>' +
          (ex.gloss ? '<div style="margin-top:2px;">' + escapeHtml(ex.gloss) + '</div>' : '') +
          '</div>';
      });
      html += '</div>';
    }

    html += '<div class="meta-line">来源：' + escapeHtml(entry.source) + '</div></div>';
    return html;
  }

  /* ---------- 查词 ---------- */
  async function doSearch() {
    const word = queryInput.value.trim();
    if (!word) { setStatus('请输入要查阅的字 / 词。', true); return; }
    if (state.busy) return;

    state.busy = true;
    searchBtn.disabled = true;
    setStatus('查阅中…', false);
    resultEl.innerHTML = '';

    const endpoint = state.lang === 'en' ? '/api/lookup/en' : '/api/lookup/zh';
    const payload = state.lang === 'en'
      ? { word }
      : { word, lang: state.lang };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.error && data.error.indexOf('API Key') !== -1) {
          state.hasKey = false;
        }
        throw new Error(data.error || ('请求失败（HTTP ' + res.status + '）'));
      }

      resultEl.innerHTML = data.type === 'en' ? renderEnglish(data) : renderChinese(data);
      setStatus('', false);
    } catch (err) {
      setStatus(err.message || '查阅失败。', true);
    } finally {
      state.busy = false;
      searchBtn.disabled = false;
    }
  }

  /* ---------- 事件绑定 ---------- */
  $('openSettings').addEventListener('click', openSettings);
  $('closeSettings').addEventListener('click', closeSettings);
  settingsOverlay.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) closeSettings();
  });
  $('saveSettings').addEventListener('click', saveSettings);
  resultEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-speak]');
    if (button) speakEnglish(button.dataset.speak);
  });
  searchBtn.addEventListener('click', doSearch);
  queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });

  /* ---------- 启动 ---------- */
  (async () => {
    await loadSettings();
    initFontSelect();
    if (!state.hasKey) {
      setStatus('首次使用：请点击右上角 ⚙ 填入千问 API Key（英文查词无需 Key）。', false);
    }
  })();
})();
