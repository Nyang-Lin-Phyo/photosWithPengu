# 🐧 Pengu Photobooth

A fun web app where you can upload your photos, arrange them into a photo strip, decorate with stickers, and download the result!

**Designed by** isecomfy  
**Developed by** isecomfy & ramseymeow

---

## ✨ Features

- Choose from multiple photo strip frame layouts
- Upload your own photos into each slot
- Decorate your strip with emoji stickers
- Download your finished photo strip as a PNG

---

## 🛠️ Tech Stack

- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — dev server & build tool
- [Lucide React](https://lucide.dev/icons/) — icons
- HTML5 Canvas — photo strip compositing & export
- CSS animations — floating elements & hover effects

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- npm (comes with Node)

> **Windows users:** This project is developed using Ubuntu via WSL2. It is recommended to run all commands inside your Ubuntu terminal, with project files stored in the Linux filesystem (e.g. `~/codeStuff/`) rather than on `/mnt/c/`.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/yozuStuff.git
cd yozuStuff

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
yozuStuff/
├── public/
├── src/
│   ├── assets/               # Images (pengu1.png, penguMustacheSunglasses1.png, etc.)
│   ├── screens/              # One component per screen
│   │   ├── Landing.jsx       # Landing page
│   │   ├── ChooseFrame.jsx   # Frame selection
│   │   ├── AddPhotos.jsx     # Photo upload
│   │   ├── Decorate.jsx      # Sticker decoration
│   │   └── SaveStrip.jsx     # Preview & download
│   ├── App.jsx               # Root component & screen routing
│   ├── App.css
│   └── index.css             # Global styles & CSS variables
├── index.html
├── package.json              # Dependencies & scripts (no requirements.txt needed — this is Node, not Python!)
└── vite.config.js
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at localhost:5173 |
| `npm run build` | Build for production (outputs to `/dist`) |
| `npm run preview` | Preview the production build locally |

---

## 🌐 Deploying

The easiest way to share this app publicly is [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (run from project root)
vercel
```

Or just drag and drop your project folder on [Netlify Drop](https://app.netlify.com/drop) after running `npm run build` — upload the `/dist` folder.

---

## 🖼️ Adding Assets

Place any new images in `src/assets/` and import them in your component:

```jsx
import myImage from '../assets/myImage.png'

<img src={myImage} alt="description" />
```

---

## 📝 Notes

- No backend required — everything runs in the browser
- No `.env` file needed for the base app
- `package.json` replaces `requirements.txt` — anyone cloning just runs `npm install`