import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

interface IProps {
  videoCover: any;
  videoTitle: string;
  userAvatar: string;
  userName: string;
  createTime: string;
}

const StyledCard = styled(Card)`
  &: hover {
    transform: scale(1.07);
    filter: brightness(1.2);
    box-shadow: 5px 5px 20px 5px rgba(0, 0, 0, 0.5);
    opacity: 1;
  }
  width: 360px;
  margin-top: 25px;
`;

const TypoWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function VideoCard(props: IProps) {
  const { videoCover, videoTitle, userAvatar, userName, createTime } = props;
  return (
    <>
      <StyledCard style={{ cursor: 'pointer' }}>
        <CardMedia
          component='img'
          height='194'
          image={videoCover}
          alt='videoCoverUrl'
        />
        <CardContent style={{ height: '1px' }}>
          <TypoWrapper>
            <Typography
              style={{ fontWeight: 600 }}
              noWrap
              variant='body2'
              color='text.secondary'
            >
              {videoTitle}
            </Typography>
          </TypoWrapper>
        </CardContent>
        <Divider style={{ marginTop: '5px' }} />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              {userAvatar}
            </Avatar>
          }
          title={
            <Typography noWrap variant='body2' color='text.secondary'>
              {userName}
            </Typography>
          }
          subheader={createTime}
        />
      </StyledCard>
    </>
  );
}
