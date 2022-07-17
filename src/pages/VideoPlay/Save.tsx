import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { videoSave } from '../../webApi';
import { useLocation } from 'react-router-dom';

export default function Save() {
  const [save, setSave] = useState(false);

  const location = useLocation();
  const videoId = location.pathname.slice(7);

  useEffect(() => {}, []);

  const handleSaveButtonClick = () => {
    videoSave(videoId);
    setSave(!save);
  };
  return (
    <>
      <Button
        onClick={handleSaveButtonClick}
        style={{ color: save ? '' : 'gray', marginRight: '20px' }}
      >
        <LibraryAddIcon style={{ verticalAlign: 'bottom' }} />
        save
      </Button>
    </>
  );
}
