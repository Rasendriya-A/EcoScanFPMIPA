import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/Navbar';
import Welcome from './pages/WelcomePage/Welcome';
import Home from './pages/HomePage/Home';
import Scan from './pages/ScanPage/Scan';
import Result from './pages/ResultPage/Result';
import About from './pages/AboutPage/About';
import './App.css';

function App() {
  return (
    <LocationProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={
              <>
                <Navbar />
                <Home />
              </>
            } />
            <Route path="/scan" element={
              <>
                <Navbar />
                <Scan />
              </>
            } />
            <Route path="/result" element={
              <>
                <Navbar />
                <Result />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <About />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </LocationProvider>
  );
}

export default App;
