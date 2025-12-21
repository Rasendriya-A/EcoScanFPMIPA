# Setup Model AI untuk EcoScan

Model TensorFlow Lite (`.tflite`) tidak dapat langsung digunakan di browser web. Ada beberapa cara untuk mengintegrasikan model Teachable Machine ke dalam aplikasi web React:

## ✅ Opsi 1: Gunakan Teachable Machine Cloud URL (RECOMMENDED - Paling Mudah)

1. **Buka Teachable Machine** (https://teachablemachine.withgoogle.com/)
2. **Klik "Upload my model"** pada project yang sudah Anda latih
3. **Klik tombol "Upload my model (Shareable Link)"**
4. **Copy URL** yang diberikan (contoh: `https://teachablemachine.withgoogle.com/models/xxxxx/`)
5. **Update file `modelUtils.js`**:

```javascript
// Ganti bagian loadModel() dengan:
export async function loadModel() {
  try {
    const MODEL_URL = "https://teachablemachine.withgoogle.com/models/xxxxx/";

    // Load model
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tf.loadLayersModel(modelURL);

    // Load metadata untuk labels
    const metadataResponse = await fetch(metadataURL);
    const metadata = await metadataResponse.json();
    labels = metadata.labels;

    console.log("Model loaded successfully");
    console.log("Labels:", labels);

    return { success: true };
  } catch (error) {
    console.error("Error loading model:", error);
    return { success: false, error: error.message };
  }
}
```

**Kelebihan:**

- ✅ Paling mudah dan cepat
- ✅ Tidak perlu konversi
- ✅ Model di-host oleh Google
- ✅ Otomatis dapat URL + metadata

**Kekurangan:**

- ❌ Butuh internet untuk load model pertama kali
- ❌ Tergantung server Google

---

## Opsi 2: Export TensorFlow.js dari Teachable Machine

1. **Di Teachable Machine, klik "Export Model"**
2. **Pilih tab "TensorFlow.js"**
3. **Pilih "Download"** (bukan Upload)
4. **Extract file .zip** yang di-download
5. **Copy semua file ke folder `Frontend/public/model/`**:

   - `model.json`
   - `weights.bin`
   - `metadata.json`

6. **Update `modelUtils.js`**:

```javascript
export async function loadModel() {
  try {
    // Load model dari folder public
    model = await tf.loadLayersModel("/model/model.json");

    // Load metadata untuk labels
    const metadataResponse = await fetch("/model/metadata.json");
    const metadata = await metadataResponse.json();
    labels = metadata.labels;

    console.log("Model loaded successfully");
    return { success: true };
  } catch (error) {
    console.error("Error loading model:", error);
    return { success: false, error: error.message };
  }
}
```

**Kelebihan:**

- ✅ Model tersimpan lokal (lebih cepat setelah load pertama)
- ✅ Bisa offline setelah PWA di-cache
- ✅ Tidak tergantung server eksternal

**Kekurangan:**

- ❌ File size lebih besar (harus di-bundle/deploy)
- ❌ Perlu re-export jika model di-update

---

## Opsi 3: Konversi TFLite ke TensorFlow.js (Advanced)

Jika Anda sudah terlanjur punya file `.tflite` dan tidak bisa export ulang:

1. **Install TensorFlow Python**:

```bash
pip install tensorflowjs
```

2. **Konversi model**:

```bash
tensorflowjs_converter \
    --input_format=tf_saved_model \
    --output_format=tfjs_layers_model \
    model_unquant.tflite \
    ./tfjs_model/
```

**Note**: Konversi TFLite ke TFJS kadang rumit karena format tidak 100% kompatibel.

---

## 🎯 Rekomendasi

**Gunakan Opsi 1 (Cloud URL)** untuk development dan testing cepat.

Jika aplikasi akan di-deploy untuk produksi dan butuh performa terbaik, gunakan **Opsi 2** (Local TensorFlow.js).

---

## Testing Setelah Setup

1. Jalankan dev server: `npm run dev`
2. Buka browser ke `http://localhost:5173`
3. Navigasi ke halaman Scan
4. Upload foto sampah
5. Klik "Scan Sekarang"
6. Lihat hasil prediksi di halaman Result

---

## Troubleshooting

### Error: "Model belum di-load"

- Cek console browser (F12) untuk error detail
- Pastikan URL/path model sudah benar
- Cek network tab untuk melihat request model

### Error: "CORS policy"

- Jika menggunakan URL external, pastikan server support CORS
- Gunakan Teachable Machine URL yang otomatis support CORS

### Prediksi tidak akurat

- Pastikan preprocessing image sama dengan saat training (224x224)
- Cek normalisasi (0-1 atau -1-1)
- Verifikasi label order sama dengan saat training

### Model loading lambat

- Pertama kali load akan download model (~5-10 MB)
- Setelah itu browser akan cache
- Pertimbangkan gunakan loading placeholder
