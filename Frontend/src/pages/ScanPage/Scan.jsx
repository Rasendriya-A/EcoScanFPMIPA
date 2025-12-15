import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Scan.css';

function Scan() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleScan = async () => {
    if (!selectedImage) {
      alert('Pilih gambar terlebih dahulu!');
      return;
    }

    setIsProcessing(true);

    // Simulasi proses scanning (nanti diganti dengan API call ke backend)
    setTimeout(() => {
      setIsProcessing(false);
      
      // Navigate ke result page dengan data
      navigate('/result', {
        state: {
          image: previewUrl,
          // Data ini nanti akan dari API response
          wasteType: 'Plastik',
          category: 'Anorganik',
          confidence: 95,
          disposal: 'Buang ke tempat sampah plastik/anorganik',
          recyclingTip: 'Bersihkan dan keringkan sebelum di-recycle'
        }
      });
    }, 2000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="scan-container">
      <div className="scan-header">
        <h1>Scan Sampah</h1>
        <p>Ambil atau upload foto sampah untuk identifikasi</p>
      </div>

      <div className="scan-content">
        {!previewUrl ? (
          <div className="upload-section">
            <div className="camera-placeholder" onClick={handleCameraClick}>
              <span className="camera-icon">📷</span>
              <p>Klik untuk ambil/upload foto</p>
              <p className="hint">Format: JPG, PNG, JPEG</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              capture="environment"
            />
          </div>
        ) : (
          <div className="preview-section">
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn-secondary" 
                onClick={handleReset}
                disabled={isProcessing}
              >
                Ganti Foto
              </button>
              <button 
                className="btn-primary" 
                onClick={handleScan}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    Memproses...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Scan Sekarang
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-content">
            <div className="loader"></div>
            <p>Mengidentifikasi sampah...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scan;
