import { useState, useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { videoLike, videoDislike } from '../../webApi';
import { useLocation } from 'react-router-dom';
interface IProps {
  likeCount: number;
  dislikeCount: number;
  user: unknown;
  likeStatus: number;
}

export default function LikeButtons(props: IProps) {
  const { likeCount, dislikeCount, user, likeStatus } = props;
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(likeCount);
  const [dislikeNumber, setDislikeNumber] = useState(dislikeCount);

  const location = useLocation();
  const videoId = location.pathname.slice(7);

  useEffect(() => {
    if (likeStatus === 1) {
      setLike(true);
    } else if (likeStatus === -1) {
      setDislike(true);
    }
  }, [likeStatus]);

  const handleLikeButton = () => {
    if (!user) return;
    videoLike(videoId);
    if (like) {
      setLike(false);
      setLikeNumber(likeNumber - 1);
    } else if (dislike) {
      setLike(true);
      setLikeNumber(likeNumber + 1);
      setDislike(false);
      setDislikeNumber(dislikeNumber - 1);
    } else {
      setLike(true);
      setLikeNumber(likeNumber + 1);
    }
  };

  const handleDislikeButton = () => {
    if (!user) return;
    videoDislike(videoId);
    if (like) {
      setDislike(true);
      setDislikeNumber(dislikeNumber + 1);
      setLike(false);
      setLikeNumber(likeNumber - 1);
    } else if (dislike) {
      setDislike(false);
      setDislikeNumber(dislikeNumber - 1);
    } else {
      setDislike(true);
      setDislikeNumber(dislikeNumber + 1);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Typography
        style={{ margin: 'auto 0' }}
        variant='body1'
        color='text.secondary'
      >
        <Button
          onClick={handleLikeButton}
          style={{ color: like ? '' : 'gray' }}
        >
          <>
            <ThumbUpIcon
              style={{ verticalAlign: 'bottom', marginRight: '5px' }}
            />
            {likeNumber}
          </>
        </Button>
      </Typography>
      <Typography
        style={{ margin: 'auto 0' }}
        variant='body1'
        color='text.secondary'
      >
        <Button
          onClick={handleDislikeButton}
          style={{ color: dislike ? '' : 'gray' }}
        >
          <>
            <ThumbDownIcon
              style={{ verticalAlign: 'bottom', marginRight: '5px' }}
            />
            {dislikeNumber}
          </>
        </Button>
      </Typography>
    </div>
  );
}
