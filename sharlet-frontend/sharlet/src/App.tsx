import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";

type PopupType = 'success' | 'error';

function App() {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<PopupType>('success');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token here
      // For now, we'll just set the user state
      setUser({ token });
    }
  }, []);

  const handleLogin = (userData: any) => {
    // Store token in localStorage
    localStorage.setItem('token', userData.token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const showMessage = (message: string, type: PopupType) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="App">
      {showPopup && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 ${
          popupType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {popupMessage}
        </div>
      )}
      {!user ? (
        showLogin ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setShowLogin(false)}
            showError={(message) => showMessage(message, 'error')}
          />
        ) : (
          <Signup 
            onLogin={handleLogin} 
            onSwitchToLogin={() => {
              setShowLogin(true);
              showMessage('Registration complete', 'success');
            }} 
          />
        )
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
