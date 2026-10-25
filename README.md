# 纸页字典

一个支持英文、现代汉语和文言文查阅的轻量词典应用。

## 运行

```powershell
pip install -r requirements.txt
python app.py
```

打开 `http://127.0.0.1:5000/`。

中文与文言文查词、英文释义翻译需要配置阿里云 DashScope API Key。首次运行后，可在页面右上角设置中填写；配置保存在本地 `config.json`，不会提交到 Git。

## 部署

Linux 部署环境会通过 `Procfile` 使用 Gunicorn，并绑定平台提供的 `PORT` 环境变量。WSGI 应用入口为 `app:application`。