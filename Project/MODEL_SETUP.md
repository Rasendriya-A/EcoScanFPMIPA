# Setup Model TensorFlow.js

## ⚠️ Masalah TFLite

File `model_unquant.tflite` **tidak bisa langsung digunakan di browser**. Package `@tensorflow/tfjs-tflite` masih alpha dan tidak kompatibel dengan Vite.

## ✅ Solusi: Convert Model

Anda perlu convert model ke format TensorFlow.js. Ada 3 cara:

---

## **Option 1: Export Ulang dari Teachable Machine (PALING MUDAH)** ⭐

### Langkah-langkah:

1. **Buka project Teachable Machine Anda**
   - Pergi ke https://teachablemachine.withgoogle.com/

2. **Export Model**
   - Klik tombol "Export Model"
   - Pilih tab **"TensorFlow.js"** (BUKAN TensorFlow Lite)
   
3. **Download Model**
   - Klik "Download my model"
   - Akan download file `.zip`

4. **Extract dan Copy**
   ```
   Extracted files:
   - model.json
   - weights.bin (atau group1-shard1of1.bin)
   - metadata.json
   ```
   
   Copy semua file ke folder `public/` di project:
   ```
   Project/
   └── public/
       ├── model.json          ← Copy ke sini
       ├── weights.bin         ← Copy ke sini
       ├── metadata.json       ← Copy ke sini (optional)
       ├── labels.txt          ← Sudah ada
       └── model_unquant.tflite ← Bisa dihapus
   ```

5. **Test**
   ```bash
   npm run dev
   ```
   Model akan otomatis terdeteksi!

---

## **Option 2: Gunakan Teachable Machine Hosted URL** 🌐

Jika tidak ingin download, gunakan URL hosted:

### Langkah-langkah:

1. **Upload Model ke Teachable Machine**
   - Di Teachable Machine, klik "Export Model"
   - Pilih tab "TensorFlow.js"
   - Klik **"Upload my model"**
   - Tunggu upload selesai
   - Copy URL yang diberikan (contoh: `https://teachablemachine.withgoogle.com/models/abc123xyz/`)

2. **Update Code**
   Edit file `src/utils/modelUtils.js` line 23-29:
   
   ```javascript
   // Uncomment dan ganti dengan URL Anda
   const TEACHABLE_MACHINE_URL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/';
   try {
     model = await tf.loadLayersModel(TEACHABLE_MACHINE_URL + 'model.json');
     console.log('Model loaded from Teachable Machine URL');
     modelLoaded = true;
   } catch (e) {
     console.log('Teachable Machine URL not available');
   }
   ```

3. **Test**
   ```bash
   npm run dev
   ```

---

## **Option 3: Convert TFLite Manual** 🔧

Jika harus menggunakan file `.tflite`:

### Prerequisites:
```bash
pip install tensorflowjs
```

### Convert Command:

**Dari TFLite ke TFJS:**
```bash
tensorflowjs_converter \
  --input_format=tf_keras_saved_model \
  --output_format=tfjs_layers_model \
  ./public/model_unquant.tflite \
  ./public/
```

**Atau jika model dari Keras:**
```bash
tensorflowjs_converter \
  --input_format=keras \
  --output_format=tfjs_layers_model \
  path/to/your/keras_model.h5 \
  ./public/
```

**Hasil:**
```
public/
├── model.json       ← File model config
├── group1-shard1of1.bin  ← Weights
└── labels.txt
```

---

## 🧪 Verifikasi Setup

Setelah setup, jalankan:

```bash
npm run dev
```

### ✅ Jika Berhasil:
- Console log: `"Model loaded from public/model.json"` atau `"Model loaded from Teachable Machine URL"`
- Tidak ada error di console
- Bisa scan gambar dengan hasil prediksi real

### ❌ Jika Gagal:
Check console browser untuk error. Common issues:

1. **"Model tidak ditemukan"**
   - Pastikan `model.json` ada di folder `public/`
   - Check file name harus exact `model.json`

2. **"Failed to fetch"**
   - Clear browser cache
   - Restart dev server

3. **"Invalid model format"**
   - Pastikan export dari Teachable Machine dengan format TensorFlow.js (bukan Lite)

---

## 📁 Struktur File Akhir

```
Project/
├── public/
│   ├── model.json           ← Model config (REQUIRED)
│   ├── weights.bin          ← Model weights (REQUIRED)
│   └── labels.txt           ← Labels (sudah ada)
├── src/
│   └── utils/
│       └── modelUtils.js    ← Code untuk load model
└── package.json
```

---

## 🎯 Rekomendasi

**Gunakan Option 1 (Export ulang)** karena:
- ✅ Paling mudah
- ✅ Paling kompatibel
- ✅ Langsung dari source
- ✅ Tidak perlu install tool tambahan
- ✅ File size lebih kecil untuk web

---

## 🆘 Troubleshooting

### Model tidak load:
```javascript
// Check di browser console (F12):
// Seharusnya muncul salah satu:
"LayersModel loaded from public/model.json" ✅
"Model loaded from Teachable Machine URL" ✅

// Jika muncul:
"Model tidak ditemukan" ❌
// → Cek apakah model.json ada di public/
```

### Prediksi error:
- Pastikan ukuran input image 224x224 (sudah di-handle di code)
- Pastikan jumlah labels di `labels.txt` sama dengan jumlah class di model
- Check console untuk error detail

---

## 📚 Dokumentasi Lengkap

- [TensorFlow.js Docs](https://www.tensorflow.org/js)
- [Teachable Machine Docs](https://teachablemachine.withgoogle.com/)
- [TFJS Converter](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter)
