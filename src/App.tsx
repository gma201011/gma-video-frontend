import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Channel from './pages/Channel';
import Like from './pages/Like';
import Subscription from './pages/Subscription';
import Upload from './pages/Upload';
import Save from './pages/Save';
import VideoPlay from './pages/VideoPlay';
import { AuthContext } from './contexts';
import { auth } from './webApi';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth(token).then((res) => {
        if (res.status === 200) {
          setUser(res.data.userInfo);
        }
      });
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/video/:videoId' element={<VideoPlay />} />
            <Route path='/channel/:channelId' element={<Channel />} />
            <Route path='/like' element={<Like />} />
            <Route path='/save' element={<Save />} />
            <Route path='/subscription' element={<Subscription />} />
            <Route path='/upload' element={<Upload />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
