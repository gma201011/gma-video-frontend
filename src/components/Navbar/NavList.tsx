import { NoStyleLink } from '../StyleLink/NoStyleLink';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HomeIcon from '@mui/icons-material/Home';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Divider from '@mui/material/Divider';

export default function NavList() {
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
        {handleNavItem('/subscription', <SubscriptionsIcon />, 'Subscription')}
        {handleNavItem('/like', <ThumbUpIcon />, 'Liked Videos')}
        <Divider style={{ margin: '15px 0' }} />
        {handleNavItem('/upload', <FileUploadIcon />, 'Upload Video')}
        {handleNavItem('/yoursvid', <PhotoCameraFrontIcon />, 'Your Videos')}
        {handleNavItem('/channel', <SlideshowIcon />, 'Your Channel')}
      </List>
    </>
  );
}