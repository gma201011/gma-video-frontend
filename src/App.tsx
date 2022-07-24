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
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/video/:videoId' element={<VideoPlay user={user} />} />
            <Route
              path='/channel/:channelId'
              element={<Channel user={user} />}
            />
            <Route path='/like' element={<Like user={user} />} />
            <Route path='/save' element={<Save user={user} />} />
            <Route
              path='/subscription'
              element={<Subscription user={user} />}
            />
            <Route path='/upload' element={<Upload />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
