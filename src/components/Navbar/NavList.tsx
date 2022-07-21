import { NoStyleLink } from '../StyleLink/NoStyleLink';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

interface IProps {
  user: any;
}

export default function NavList(props: IProps) {
  const { user } = props;
  function handleNavItem(path: string, icon: any, show: string) {
    return (
      <NoStyleLink to={path}>
        <ListItem style={{ marginTop: '5px' }} disablePadding>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={show} />
          </ListItemButton>
        </ListItem>
      </NoStyleLink>
    );
  }

  return (
    <>
      <List>
        {handleNavItem('/', <HomeIcon />, 'Home')}
        {/* {handleNavItem('/like', <ThumbUpIcon />, 'Liked Videos')} */}
        {handleNavItem('/save', <LibraryAddIcon />, 'Saved Videos')}
        {handleNavItem('/subscription', <SubscriptionsIcon />, 'Subscription')}
        <Divider style={{ margin: '15px 0' }} />
        {user ? (
          <>
            {handleNavItem('/upload', <FileUploadIcon />, 'Upload Video')}
            {handleNavItem(
              `/channel/${user._id}`,
              <SlideshowIcon />,
              'Your Channel'
            )}
          </>
        ) : (
          <div style={{ marginLeft: '17px' }}>
            <Typography style={{ width: '200px' }}>
              Sign in to share your own video to everyone!
            </Typography>
            <NoStyleLink to={'/login'}>
              <Button variant='outlined' style={{ marginTop: '10px' }}>
                <AccountCircleIcon /> &nbsp; Sign in
              </Button>
            </NoStyleLink>
          </div>
        )}
      </List>
    </>
  );
}
