import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Channel from './pages/channel';
import Like from './pages/like';
import Subscription from './pages/subscription';
import Upload from './pages/upload';
import Yoursvid from './pages/yoursvid';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
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
