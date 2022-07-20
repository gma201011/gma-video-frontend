import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';

const StyledWrapper = styled.div`
  margin-top: 7vw;
  text-align: center;
`;

export default function SignInScreen() {
  return (
    <>
      <StyledWrapper>
        <SubscriptionsIcon style={{ width: '20vw', height: '15vh' }} />
        <h2>Don’t miss new videos</h2>
        <h4>Sign in to see updates from your favorite YouTube channels</h4>
        <NoStyleLink to={'/login'}>
          <Button variant='outlined'>
            <AccountCircleIcon /> &nbsp; Sign in
          </Button>
        </NoStyleLink>
      </StyledWrapper>
    </>
  );
}
