import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import { getVideoCommentList, postVideoComment } from '../../webApi';
import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';

interface IProps {
  videoId: string;
  user: any;
}

export default function CommentArea(props: IProps) {
  const { videoId, user } = props;

  const [commentList, setCommentList] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    getVideoCommentList(videoId).then((res: any) => {
      setCommentList(res);
    });
  }, [videoId]);

  const handleInputValueOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.currentTarget.value);
  };

  const handleCommentButtonOnClick = () => {
    if (!user || !inputValue) return;

    setPosting(true);

    postVideoComment(videoId, inputValue).then((res) => setPosting(false));

    const newCommentList = [
      {
        content: inputValue,
        user: { username: user.username },
      },
      ...commentList.comments,
    ];

    setCommentList({
      comments: newCommentList,
      commentCount: +commentList.commentCount + 1,
    });

    setInputValue('');
  };

  return (
    <>
      {!commentList ? (
        <>
          <Typography
            style={{ fontWeight: 600, marginLeft: '12px' }}
            variant='h6'
            gutterBottom
          >
            Comments
          </Typography>
          <CircularProgress style={{ display: 'block', margin: '10vh auto' }} />
        </>
      ) : (
        <>
          <List>
            <Typography
              style={{ fontWeight: 600, marginLeft: '12px' }}
              variant='h6'
              gutterBottom
            >
              {commentList.commentCount} Comments
            </Typography>
            {posting ? (
              <CircularProgress style={{ display: 'block', margin: 'auto' }} />
            ) : (
              <>
                {user ? (
                  <>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                          {user?.username[0]}
                        </Avatar>
                      }
                      title={
                        <>
                          <div style={{ display: 'flex' }}>
                            <TextField
                              placeholder='Add a comment...'
                              variant='standard'
                              style={{ width: '90%' }}
                              value={inputValue}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => handleInputValueOnChange(event)}
                            />
                            <Button
                              onClick={handleCommentButtonOnClick}
                              style={{
                                minWidth: '103px',
                                display: 'inline-block',
                                marginLeft: '20px',
                              }}
                              variant='contained'
                              color='primary'
                            >
                              comment
                            </Button>
                          </div>
                        </>
                      }
                      subheader={<div>&nbsp;</div>}
                    />
                  </>
                ) : (
                  <h3 style={{ marginLeft: '12px', color: 'gray' }}>
                    Please sign in to add a comment, save and subscribe the
                    video.
                  </h3>
                )}
              </>
            )}

            {commentList.comments.map((comment: any) => {
              return (
                <React.Fragment key={comment._id}>
                  <ListItem key={comment._id} alignItems='flex-start'>
                    <ListItemAvatar>
                      <NoStyleLink to={`/channel/${comment.user._id}`}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                          {comment.user.username[0]}
                        </Avatar>
                      </NoStyleLink>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography>{comment.user.username}</Typography>}
                      secondary={comment.content}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </>
      )}
    </>
  );
}
