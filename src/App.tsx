import { useState, useEffect } from 'react';
import Background from './components/Background';
import LoadingStyle from './components/LoadingStyle';
import LinkSection from './components/LinkSection';
import './styles/global.css';
import profile from "./assets/images/profile.jpg"

const App = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const userProfile = {
    name: 'Radityo shiddiq',
    username: 'legendryou_26',
    bio: 'Hobinya apa?🤔 Hobinya nge-Game,Sekalian jadi Pro Player, anjayzzz🔥 | Top Upin Dong Bangg!',
    avatar: profile,
    tags: ['Mobile legends🚀', 'Genshin Impact🔍', 'Arena of Valor🔥', 'League of Legends⚜️', 'King of Glory⚜️', 'Identity V', 'Roblox🚀', 'Guardian Tales🚀', 'Vampires fall: origins🔥', 'Soul Knight🔥', 'Champions of Avan⚜️', 'Clash of Clans🔥', 'Subway surf🔍', 'muse dash🚀', 'Minecraft🔍', 'Naruto:senki⚜️']
  };

  if (!mounted) return null;

  return (
    <div className="app">
      <Background />

      {loading && <LoadingStyle onLoadingComplete={handleLoadingComplete} />}

      <div className={`container ${!loading ? 'fade-in' : ''}`}>
        <div className="profile">
          <div className="profile-image-container">
            <img
              src={profile}
              alt="Profile"
              className="profile-img"
            />
            <div className="profile-status"></div>
          </div>
          
          <h1 className="profile-name">{userProfile.name}</h1>
          <p className="profile-username">@{userProfile.username}</p>
          
          <div className="profile-tags">
            {userProfile.tags.map((tag, index) => (
              <span key={index} className="profile-tag">{tag}</span>
            ))}
          </div>
          
          <p className="profile-bio">{userProfile.bio}</p>
        </div>

        <LinkSection />

        <footer className="footer">
          <p>© {new Date().getFullYear()} {userProfile.name} - Credit by <span className="heart">DitzDev</span></p>
        </footer>
      </div>
    </div>
  );
};

export default App;