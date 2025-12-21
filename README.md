# 🌱 EcoScan - AI-Powered Waste Classification

Aplikasi web untuk mengidentifikasi dan mengklasifikasikan jenis sampah menggunakan AI (TensorFlow.js + Teachable Machine).

## 📋 Fitur

- ✅ **Scan Sampah dengan AI**: Upload atau ambil foto sampah untuk identifikasi otomatis
- ✅ **5 Kategori Sampah**: Organik, Non Organik Daur Ulang, Botol Plastik, Kertas, Residu
- ✅ **Panduan Pembuangan**: Informasi lengkap cara membuang sampah dengan benar
- ✅ **Detail Prediksi**: Tampilan confidence score dan breakdown semua kategori
- ✅ **Responsive Design**: Tampilan optimal di desktop dan mobile

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd Frontend
npm install
```

### 2. Setup Model AI

Anda memiliki 2 opsi untuk setup model:

#### **Opsi A: Gunakan Teachable Machine Cloud URL (RECOMMENDED)**

1. Buka project Teachable Machine Anda
2. Klik "Export Model" → "Upload (Shareable Link)"
3. Copy URL yang diberikan
4. Edit `Frontend/src/utils/modelUtils.js` dan ganti dengan kode dari `modelUtils.teachablemachine.js`
5. Update variable `MODEL_URL` dengan URL Anda

#### **Opsi B: Export TensorFlow.js Lokal**

1. Di Teachable Machine, klik "Export Model"
2. Pilih tab "TensorFlow.js"
3. Klik "Download"
4. Extract file .zip
5. Copy semua file ke `Frontend/public/model/`
6. Edit `MODEL_URL` di `modelUtils.js` menjadi `/model/model.json`

> 📖 Lihat [Frontend/MODEL_SETUP.md](Frontend/MODEL_SETUP.md) untuk panduan lengkap

### 3. Jalankan Development Server

```bash
cd Frontend
npm run dev
```

Buka browser ke http://localhost:5173

### 4. Test Aplikasi

1. Navigasi ke halaman "Scan"
2. Upload foto sampah atau ambil foto
3. Klik "Scan Sekarang"
4. Lihat hasil prediksi dan panduan pembuangan

## 📊 Kategori Sampah

| Kategori                  | Deskripsi                    | Warna   |
| ------------------------- | ---------------------------- | ------- |
| 🌿 Organik                | Sampah yang dapat terurai    | Hijau   |
| ♻️ Non Organik Daur Ulang | Sampah yang dapat di-recycle | Biru    |
| 🍾 Botol Plastik          | Botol plastik khusus         | Orange  |
| 📄 Kertas                 | Kertas dan karton            | Coklat  |
| 🗑️ Residu                 | Sampah non-recyclable        | Abu-abu |

## 🔧 Teknologi

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM v7
- **AI/ML**: TensorFlow.js
- **Styling**: CSS Modules
- **Model**: Teachable Machine (Image Classification)

## 📝 Status Integrasi Model

✅ **Completed:**

- TensorFlow.js setup
- Model loading infrastructure
- Image preprocessing pipeline
- Prediction pipeline
- UI integration (Scan + Result page)
- Label mapping & waste information
- Error handling

⚠️ **Requires Action:**

- Export model dari Teachable Machine dalam format TensorFlow.js
- Update MODEL_URL dengan URL yang benar
- Test dengan real model

## 👥 Team

Developed with ❤️ by EcoScan Team
