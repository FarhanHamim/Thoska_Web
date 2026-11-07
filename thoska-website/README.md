# 🎮 Thoska Boy (ThoskaPulse) — Web Portal & Interactive Emulator

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-GPL_v3-yellow.svg?style=for-the-badge)](LICENSE)
[![NFC DESFire](https://img.shields.io/badge/NFC-MIFARE_DESFire_EV1%2FEV2-E05A2B?style=for-the-badge)](https://github.com/FarhanHamim/Thoska-Reader)

A promotional and interactive web emulator for **Thoska Boy (ThoskaPulse)** — a privacy-first, 100% offline open-source Android NFC utility designed for students across all 10 Thuringian universities (*Studierendenwerk Thüringen* network).

This web portal combines an interactive 1990s dot-matrix handheld console emulator, a live MIFARE DESFire APDU little-endian hex inspector, a tactile Mensa budget simulator, and direct distribution of the signed Android APK.

---

## 📸 Key Highlights

- **🕹️ In-Browser Handheld Console:** Fully interactive 8-bit handheld shell with functional D-Pad, angled A/B buttons, and Select/Start controls.
- **🔊 Native Web Audio Synthesizer:** Real-time square, sawtooth, and triangle wave sound engine reproducing classic Game Boy coin chimes, clicks, eject sweeps, and low-HP warnings with zero audio file downloads.
- **🎨 Dot-Matrix LCD Palettes:** Instant on-the-fly palette swapping between:
  - `DMG OLIVE (1989)`
  - `POCKET SILVER (1996)`
  - `LIGHT CYAN (1998)`
- **🏛️ 10 Thuringian Universities Support:** Dynamic 8-bit Canvas/SVG university emblems for:
  - Ernst-Abbe-Hochschule Jena (`EAH JENA`)
  - Friedrich-Schiller-Universität Jena (`FSU JENA`)
  - Technische Universität Ilmenau (`TU ILMENAU`)
  - Bauhaus-Universität Weimar (`BAUHAUS WEIMAR`)
  - Universität Erfurt (`UNI ERFURT`)
  - Fachhochschule Erfurt (`FH ERFURT`)
  - Hochschule Schmalkalden (`HS SCHMALKALDEN`)
  - Hochschule Nordhausen (`HS NORDHAUSEN`)
  - Hochschule für Musik Franz Liszt Weimar (`HFM WEIMAR`)
  - Duale Hochschule Gera-Eisenach (`DHGE`)
- **💡 1D Barcode Turnstile Mode:** Simulates window brightness boost (100% Lux) and displays high-contrast Code-128 library barcodes with compliant white quiet zones for campus library turnstiles.
- **🔬 Live APDU Little-Endian Inspector:** Interactive reverse-engineering tool calculating raw DESFire transmission (TX) and reception (RX) byte frames based on user-entered Euro balances.
- **📦 Direct APK Downloads:** Bundles the signed `ThoskaBoy-release.apk` in the `/public` assets for instant downloads without external hops.

---

## 🗂️ Project Directory Structure

```text
TW/
├── package.json              # Monorepo / root build orchestrator for Vercel
├── vercel.json               # Vercel deployment configuration
├── .gitignore                # Git exclusions (node_modules, dist, logs)
├── README.md                 # Project documentation
└── thoska-website/           # Core Vite React application
    ├── public/               # Static assets served at domain root
    │   ├── ThoskaBoy-release.apk   # Direct download APK (v1.1.0)
    │   ├── thoska-boy-v1.1.0.apk   # Versioned APK
    │   ├── favicon.svg             # Retro console favicon
    │   └── icons.svg
    ├── src/
    │   ├── App.jsx           # Main React component (Emulator, UI, Audio, APDU)
    │   ├── index.css         # Tailwind v4 import & Google Fonts styling
    │   ├── main.jsx          # React DOM entry point
    │   └── assets/           # Internal web assets
    ├── index.html            # HTML5 document shell with SEO meta tags
    ├── package.json          # Frontend dependencies & scripts
    └── vite.config.js        # Vite + Tailwind v4 + React plugin configuration
```

---

## 🚀 Quick Start & Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- `npm` (version `9.x` or higher)

### 1. Installation

```bash
# Install dependencies
npm install
```

### 2. Start Local Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to test the interactive emulator with live hot module replacement (HMR).

### 3. Production Build

To compile and bundle optimized static assets:

```bash
npm run build
```

The production assets and bundled APK will be written to `dist/`.

### 4. Preview Production Build

```bash
npm run preview
```

---

## ☁️ Deployment on Vercel

### Method A: Deploy via GitHub & Vercel Dashboard (Recommended)

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Thoska Boy website"
   ```
2. Create a new repository on [GitHub](https://github.com/new) and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/thoska-boy-website.git
   git branch -M main
   git push -u origin main
   ```
3. Open [vercel.com/new](https://vercel.com/new) and import your repository.
4. Click **Deploy**.

### Method B: Deploy via Vercel CLI

```bash
npx vercel
npx vercel --prod
```

Once deployed, your direct APK download is immediately accessible at:
```
https://<your-vercel-domain>/ThoskaBoy-release.apk
```

---

## 🕹️ Interactive Emulator Controls

| Input Control | Button / Action | In-App Functionality |
| :--- | :--- | :--- |
| **START** | Pill Button | **Simulate Card Tap:** Locks 7-byte UID and reads balance (40.40 €). |
| **SELECT** | Pill Button | **Eject Card:** Clears active profile, wiping memory back to 100% idle. |
| **A BUTTON** | Red Glossy Btn | **Flip Card:** Displays 1D Code-128 library barcode & 100% Lux indicator. |
| **B BUTTON** | Red Glossy Btn | **History:** Opens the 5-scan SQLite transaction history log + CSV export. |
| **▲ / ▼ (D-Pad)** | Directional Cross | **Budget Simulator:** Cycles Mensa items (Coffee, Wash, Dish, Premium Meal). |
| **◄ / ► (D-Pad)** | Directional Cross | **Palette Swapper:** Cycles LCD screens (DMG Olive, Silver, Cyan). |
| **SFX ON/MUTE**| Header Button | Toggles retro Web Audio synthesizer sound effects on/off. |

---

## 📡 Under the Hood: DESFire APDU & DSGVO

Thuringian student cards (*thoska*) utilize **NXP MIFARE DESFire EV1/EV2** contactless smart card ICs operating at `13.56 MHz`.

### 1. ISO-DEP Raw Command Flow

```text
[Phone NFC Antenna]                 [thoska Card]
        │                                  │
        ├──── 90 5A 00 00 03 15 84 5F 00 ─>│ Select Intercard AID (0x5F8415)
        │<─── 91 00 (SUCCESS) ─────────────┤
        │                                  │
        ├──── 90 6C 00 00 01 01 00 ────────>│ Read Value File 0x01
        │<─── [B0 B1 B2 B3] 91 00 ─────────┤ (32-bit Little-Endian Millicents)
        │                                  │
        ├──── 90 F5 00 00 01 01 00 ────────>│ Get File Settings 0x01
        │<─── [16 Bytes Payload] 91 00 ────┤ (Bytes 12-15 = Last Transaction)
```

### 2. Little-Endian Integer Conversion

Balances in Intercard DESFire File `0x01` are stored as 32-bit signed integers in **1/1000 € (millicents)**:

$$\text{Balance (€)} = \frac{\text{Byte}_0 + (\text{Byte}_1 \times 2^8) + (\text{Byte}_2 \times 2^{16}) + (\text{Byte}_3 \times 2^{24})}{1000}$$

*Example:* `40.40 €` $\rightarrow 40400$ millicents $\rightarrow$ `0x00009DD0` $\rightarrow$ transmitted as `D0 9D 00 00`.

### 3. German Data Protection (DSGVO / GDPR)

- **Public Unencrypted Blocks:** 7-Byte Hardware UID (`tag.id`), Mensa Balance (`File 0x01`), and Last Transaction Delta.
- **AES-128 Protected Blocks:** Personal identity files (Full Legal Name, Matriculation Number, Library Barcode) require proprietary cryptographic keys held only by authorized Studierendenwerk terminals.
- **Thoska Boy Privacy Solution:** Completely anonymous by default. Users can optionally bind their library barcode locally to their card's unique 7-byte hardware UID in encrypted on-device storage. The Android app requests **zero** `android.permission.INTERNET`.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/) + Custom Retro 8-Bit SVG Emblems
- **Audio:** Native Web Audio API (Synthesizer Oscillators)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 👨‍💻 Author & Credits

- **Developer:** Farhan Zaman Ha-mim
  - *M.Sc. Scientific Instrumentation, Ernst-Abbe-Hochschule Jena*
  - GitHub: [@FarhanHamim](https://github.com/FarhanHamim)
  - Android App Repository: [FarhanHamim/Thoska-Reader](https://github.com/FarhanHamim/Thoska-Reader)

---

## ⚖️ Legal Disclaimer

*Thoska Boy (ThoskaPulse)* and this web portal are unofficial, independent student-built open-source projects. They are **not** affiliated with, endorsed by, sponsored by, or connected to *Studierendenwerk Thüringen*, *Ernst-Abbe-Hochschule Jena*, *Friedrich-Schiller-Universität Jena*, or *Intercard GmbH*. All registered trademarks and institutional emblems belong to their respective owners.
