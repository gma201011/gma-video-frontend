import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NoStyleLink } from '../StyleLink/NoStyleLink';

const StyledWrapper = styled.div`
  margin-top: 7vw;
  text-align: center;
`;

interface IProps {
  message: any;
}

export default function SignInScreen(props: IProps) {
  const { message } = props;
  return (
    <>
      <StyledWrapper>
        <SubscriptionsIcon style={{ width: '20vw', height: '15vh' }} />
        <h2>{message.title}</h2>
        <h4>{message.content}</h4>
        <NoStyleLink to={'/login'}>
          <Button variant='outlined'>
            <AccountCircleIcon /> &nbsp; Sign in
          </Button>
        </NoStyleLink>
      </StyledWrapper>
    </>
  );
}
