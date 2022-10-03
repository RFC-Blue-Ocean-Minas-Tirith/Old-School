// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar/AppNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/ProfilePages/ProfilePage';
import VideoPage from './components/VideoPage/VideoPage';

function App() {
  // const [state, setState] = useState(0)
  const user = {
    firstName: 'Allie',
    lastName: 'B.',
    profilePicture: 'https://source.unsplash.com/oEcsvUfCr1c/384x192',
    username: 'AllEyesBlank',
    email: 'example@example.com',
    password: 'xcddfc',
    bio: 'I am a cool programmer and I do cool things.',
    favorites: [],
  };

  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="profile_page" element={<ProfilePage user={user} />} />
        <Route path="video_page" element={<VideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
