import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, MoonIcon, SunIcon, BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import dataService from '../services/dataService';

function Navbar({ toggleDarkMode, darkMode, setSidebarOpen }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userName = user.name || 'Utilisateur Admin';
  const userEmail = user.email || 'admin@restaurant.com';
  const userInitial = userName.charAt(0).toUpperCase();
  
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.name !== user.name) {
        setUser(storedUser);
      }
    };
    checkUser();
    
    // Charger les notifications depuis le service centralisé
    setNotifications(dataService.getNotifications().slice(0, 5));
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown')) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <nav className={`navbar navbar-expand-lg border-bottom ${darkMode ? 'bg-dark border-secondary' : 'bg-white border-light'}`} style={{boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'}}>
      <div className="container-fluid px-4">
        <button
          className={`btn btn-link p-0 me-3 d-lg-none ${darkMode ? 'text-light' : 'text-dark'}`}
          onClick={() => setSidebarOpen(true)}
          title="Ouvrir menu"
        >
          <Bars3Icon style={{width: '24px', height: '24px'}} />
        </button>
        
        <div className="d-flex align-items-center flex-fill">
          <div className="d-none d-md-block">
            <h6 className={`mb-0 fw-500 ${darkMode ? 'text-light' : 'text-dark'}`}>Bienvenue {userName}!</h6>
            <small className={darkMode ? 'text-light' : 'text-muted'}>Voici votre aperçu du jour</small>
          </div>
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <div className="dropdown me-2 position-relative">
            <button 
              className={`btn btn-link p-2 position-relative ${darkMode ? 'text-light' : 'text-muted'}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              title="Notifications"
            >
              <BellIcon style={{width: '20px', height: '20px'}} />
              {notifications.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem', padding: '2px 4px'}}>
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className={`dropdown-menu dropdown-menu-end show position-absolute ${darkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`} style={{minWidth: '320px', maxHeight: '400px', overflowY: 'auto', right: 0, top: '100%', zIndex: 1000}}>
                <h6 className="dropdown-header"><strong>Notifications</strong></h6>
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <div key={index} className={`dropdown-item border-bottom ${darkMode ? 'border-secondary' : 'border-light'}`} style={{whiteSpace: 'normal'}} onClick={() => navigate('/notifications')}>
                      <small className={`text-muted d-block ${darkMode ? 'text-secondary' : ''}`}>{notif.type}</small>
                      <div className="fw-500">{notif.title}</div>
                      <small className={darkMode ? 'text-secondary' : 'text-muted'}>{notif.time}</small>
                    </div>
                  ))
                ) : (
                  <div className={`dropdown-item text-center ${darkMode ? 'text-secondary' : 'text-muted'}`}>Aucune notification</div>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDarkMode();
            }}
            className={`btn btn-link p-2 me-2 ${darkMode ? 'text-light' : 'text-muted'}`}
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
          >
            {darkMode ? <SunIcon style={{width: '20px', height: '20px'}} /> : <MoonIcon style={{width: '20px', height: '20px'}} />}
          </button>
          
          <div className="dropdown position-relative">
            <div 
              className={`d-flex align-items-center cursor-pointer px-2 py-1 rounded`}
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              style={{cursor: 'pointer'}}
              title="Menu profil"
            >
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-medium me-2" style={{width: '36px', height: '36px', fontSize: '14px'}}>
                {userInitial}
              </div>
              <div className="d-none d-sm-block text-start">
                <div className={`fw-medium small ${darkMode ? 'text-light' : 'text-dark'}`}>{userName}</div>
                <small className={darkMode ? 'text-secondary' : 'text-muted'}>{user.role || 'Administrateur'}</small>
              </div>
              <ChevronDownIcon className={`ms-2 ${darkMode ? 'text-light' : 'text-muted'}`} style={{width: '16px', height: '16px'}} />
            </div>
            {showProfileMenu && (
              <div className={`dropdown-menu dropdown-menu-end show position-absolute ${darkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`} style={{right: 0, top: '100%', minWidth: '220px', zIndex: 1000}}>
                <a className={`dropdown-item ${darkMode ? 'text-light' : ''}`} href="#profile" onClick={(e) => e.preventDefault()}>
                  ⚙️ Paramètres Profil
                </a>
                <a className={`dropdown-item ${darkMode ? 'text-light' : ''}`} href="#activity" onClick={(e) => e.preventDefault()}>
                  📊 Historique d'activité
                </a>
                <div className="dropdown-divider"></div>
                <a className={`dropdown-item text-danger`} href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                  🚪 Déconnexion
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
