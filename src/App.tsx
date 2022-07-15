import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Channel from './pages/Channel';
import Like from './pages/Like';
import Subscription from './pages/Subscription';
import Upload from './pages/Upload';
import Yoursvid from './pages/Yoursvid';
import VideoPlay from './pages/VideoPlay';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/video/:videoId' element={<VideoPlay />} />
          <Route path='/channel' element={<Channel />} />
          <Route path='/like' element={<Like />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/yoursvid' element={<Yoursvid />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
