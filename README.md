
# 🪱 WormDive

**WormDive** is a privacy-focused, AI-powered web tool that helps users understand what personal information about them is exposed online. By analyzing their digital footprint, WormDive empowers people to make informed choices about their privacy.

![WormDive Banner](optional-banner-image-url)

---

## 🚀 Features

* 🔍 **Digital Footprint Analysis**
  AI-powered insights into the publicly available information about you.

* 📊 **Interactive Data Visualizations**
  Clean, accessible D3.js charts that make your data exposure clear at a glance.

* 🤖 **AI Explanations**
  Uses Gemini to generate easy-to-read, actionable privacy reports.

* 🔐 **Privacy First Design**

  * No personal identifiers collected unless explicitly provided.
  * Local-first approach wherever possible.
  * Transparent and minimal data usage.

* 🌐 **Modern Web Stack**

  * Frontend in TypeScript
  * Backend in FASTAPI
  * Interactive visualizations in D3.js

---

## 💡 Inspiration

We believe people often share much more about themselves online than they realize. WormDive was created to help users see their online presence from a stranger’s perspective—and decide if they're comfortable with what’s out there.

We’re a privacy-focused team with healthy relationships with our parents *and* a healthy fear of oversharing. We want to help others learn more about their own digital footprint!

---

## 🛠️ Tech Stack

* **Frontend**: TypeScript, D3.js
* **Backend**: FASTAPI
* **AI/LLM Integration**: Gemini
* **APIs**: RESTful design with secure, concurrency-friendly handling

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/04fb0cc0-3ad9-4573-9a8f-3f9604cb30ef)
![image](https://github.com/user-attachments/assets/76fd9e3c-1895-4011-832c-8af170c2b150)
![image](https://github.com/user-attachments/assets/37aa903d-d17e-42e7-b888-a6a87848d8bd)
![image](https://github.com/user-attachments/assets/fca5fcc3-6103-442d-9897-6fdc017a441b)


---

## ⚙️ How It Works

1. User provides their public-facing data sources (e.g. social profiles, search results, uploaded text).
2. Backend processes and sanitizes inputs via FASTAPI.
3. Gemini LLM analyzes the data and generates a privacy report.
4. Frontend renders:

   * AI-generated insights.
   * Interactive D3.js visualizations highlighting personal data exposure.

---

## 🏗️ Architecture

```
Frontend (TypeScript)
│
├── D3.js Visualizations
│
└── REST API calls ───► FASTAPI Backend
                       │
                       ├── Data Sanitization
                       ├── Gemini Analysis
                       └── JSON Response
```

---

## 🎯 Goals

* Make privacy awareness accessible to everyone.
* Help users identify and reduce unnecessary personal data exposure.
* Maintain user trust with transparent, privacy-respecting design.

---

## 📈 Roadmap

* Add more AI analysis types
* Extend visualizations (heatmaps, timelines)
* Support additional languages
* Integrate privacy best-practice recommendations

---

## ⚠️ Disclaimer

WormDive is an educational tool only. It does not guarantee complete privacy or security. Users should always exercise caution and use their judgment when sharing information online.

---

## 📄 License

MIT License. See `LICENSE` for details.

---
