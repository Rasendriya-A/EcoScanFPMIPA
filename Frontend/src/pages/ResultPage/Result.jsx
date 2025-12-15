import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Result.css';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  useEffect(() => {
    // Redirect ke scan jika tidak ada data
    if (!result) {
      navigate('/scan');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const getColorByCategory = (category) => {
    const colors = {
      'Organik': '#4caf50',
      'Anorganik': '#2196f3',
      'B3': '#f44336',
      'Plastik': '#ff9800'
    };
    return colors[category] || '#667eea';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Organik': '🌿',
      'Anorganik': '♻️',
      'B3': '⚠️',
      'Plastik': '🔄'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h1>Hasil Identifikasi</h1>
      </div>

      <div className="result-content">
        {/* Image Section */}
        <div className="result-image">
          <img src={result.image} alt="Scanned waste" />
        </div>

        {/* Result Info */}
        <div className="result-info">
          <div 
            className="category-badge" 
            style={{ backgroundColor: getColorByCategory(result.category) }}
          >
            <span className="category-icon">{getCategoryIcon(result.category)}</span>
            <span className="category-name">{result.category}</span>
          </div>

          <h2 className="waste-type">{result.wasteType}</h2>

          <div className="confidence-bar">
            <div className="confidence-label">
              <span>Tingkat Kepercayaan</span>
              <span className="confidence-value">{result.confidence}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Disposal Instructions */}
        <div className="info-card">
          <div className="card-header">
            <span className="card-icon">🗑️</span>
            <h3>Cara Pembuangan</h3>
          </div>
          <p className="card-content">{result.disposal}</p>
        </div>

        {/* Recycling Tips */}
        {result.recyclingTip && (
          <div className="info-card">
            <div className="card-header">
              <span className="card-icon">💡</span>
              <h3>Tips Daur Ulang</h3>
            </div>
            <p className="card-content">{result.recyclingTip}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn-secondary" 
            onClick={() => navigate('/')}
          >
            Kembali ke Home
          </button>
          <button 
            className="btn-primary" 
            onClick={() => navigate('/scan')}
          >
            Scan Lagi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
