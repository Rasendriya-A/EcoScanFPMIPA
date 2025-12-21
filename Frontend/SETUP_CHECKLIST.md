# ✅ Checklist Setup Model EcoScan

## 📝 Pre-Setup (Sudah Selesai ✅)

- [x] Install TensorFlow.js
- [x] Buat model utilities
- [x] Integrasi dengan UI (ScanPage + ResultPage)
- [x] Setup preprocessing & prediction pipeline
- [x] Buat dokumentasi lengkap

---

## 🎯 Setup Model (Anda Perlu Lakukan)

### Persiapan

- [ ] Pastikan Anda punya akses ke project Teachable Machine
- [ ] Pastikan model sudah di-train dengan baik (accuracy >80%)
- [ ] Pastikan ada 5 classes: Organik, Non Organik Daur Ulang, Botol Plastik, Kertas, Residu

### Pilih Metode Setup

#### **Metode A: Cloud URL (Recommended)** ⭐

- [ ] Buka Teachable Machine project
- [ ] Klik "Export Model"
- [ ] Klik "Upload (Shareable Link)"
- [ ] Copy URL yang muncul
- [ ] Backup file: `cp src/utils/modelUtils.js src/utils/modelUtils.backup.js`
- [ ] Copy file: `cp src/utils/modelUtils.teachablemachine.js src/utils/modelUtils.js`
- [ ] Edit `src/utils/modelUtils.js` baris 18
- [ ] Paste URL di variable `MODEL_URL`
- [ ] Save file

#### **Metode B: Local Download**

- [ ] Di Teachable Machine, klik "Export Model"
- [ ] Pilih tab "TensorFlow.js"
- [ ] Klik "Download"
- [ ] Extract file .zip
- [ ] Buat folder `public/model/` jika belum ada
- [ ] Copy semua file (model.json, weights.bin, metadata.json) ke `public/model/`
- [ ] Edit `src/utils/modelUtils.js`
- [ ] Set `MODEL_URL = '/model/'`
- [ ] Save file

---

## 🧪 Testing

- [ ] Buka terminal di folder Frontend
- [ ] Run: `npm run dev`
- [ ] Buka browser: http://localhost:5173
- [ ] Navigasi ke halaman "Scan"
- [ ] Check status model loading (lihat di atas header)
  - [ ] ✅ Hijau = "Model loaded successfully"
  - [ ] ❌ Merah = Ada error (baca error message)
- [ ] Buka Console browser (F12)
- [ ] Check log:
  - [ ] "Model loaded successfully"
  - [ ] "Labels loaded: [...]"
- [ ] Upload foto sampah
- [ ] Klik "Scan Sekarang"
- [ ] Tunggu processing
- [ ] Verifikasi hasil prediksi:
  - [ ] Label muncul dengan benar
  - [ ] Confidence score masuk akal (>50%)
  - [ ] Panduan pembuangan tampil
  - [ ] Detail breakdown prediksi tampil

---

## 📊 Validasi Kualitas

Test dengan berbagai jenis sampah:

### Test Case 1: Sampah Organik

- [ ] Upload foto sisa makanan/daun
- [ ] Expected: Label = "Organik", Confidence >70%
- [ ] Warna badge = Hijau
- [ ] Icon = 🌿

### Test Case 2: Botol Plastik

- [ ] Upload foto botol plastik
- [ ] Expected: Label = "Botol Plastik", Confidence >70%
- [ ] Warna badge = Orange
- [ ] Icon = 🍾

### Test Case 3: Kertas

- [ ] Upload foto kertas/kardus
- [ ] Expected: Label = "Kertas", Confidence >70%
- [ ] Warna badge = Coklat
- [ ] Icon = 📄

### Test Case 4: Non Organik

- [ ] Upload foto kaleng/logam
- [ ] Expected: Label = "Non Organik Daur Ulang"
- [ ] Warna badge = Biru
- [ ] Icon = ♻️

### Test Case 5: Residu

- [ ] Upload foto plastik kotor/campuran
- [ ] Expected: Label = "Residu"
- [ ] Warna badge = Abu-abu
- [ ] Icon = 🗑️

---

## 🐛 Troubleshooting

### Jika Model Tidak Load

- [ ] Check console untuk error message
- [ ] Verifikasi MODEL_URL sudah benar
- [ ] Test URL di browser (buka MODEL_URL + 'model.json')
- [ ] Check CORS - pastikan URL accessible
- [ ] Try refresh halaman (Ctrl+F5)

### Jika Prediksi Tidak Akurat

- [ ] Gunakan foto dengan lighting baik
- [ ] Pastikan objek sampah jelas dan fokus
- [ ] Check apakah model cukup di-train (min 50 foto per class)
- [ ] Verifikasi preprocessing sesuai (224x224, normalize 0-1)

### Jika Error CORS

- [ ] Gunakan Teachable Machine Cloud URL (auto CORS)
- [ ] Atau gunakan local model (Metode B)

---

## ✅ Final Check

Setelah semua checklist di atas selesai:

- [ ] Model load tanpa error
- [ ] Bisa scan foto sampah
- [ ] Prediksi akurat (>70% confidence)
- [ ] UI tampil dengan baik
- [ ] Tidak ada error di console
- [ ] Ready untuk demo/deployment 🚀

---

## 📞 Bantuan

Jika masih ada masalah:

1. Baca [MODEL_SETUP.md](MODEL_SETUP.md) untuk detail lengkap
2. Baca [INTEGRATION_SUMMARY.md](../INTEGRATION_SUMMARY.md) untuk overview
3. Check console browser untuk error detail
4. Verifikasi network tab untuk request model

---

**Estimasi Waktu Total Setup: 5-10 menit** ⏱️

Selamat mencoba! 🎉
