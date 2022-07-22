import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin-top: 7vw;
  text-align: center;
`;

export default function NoSubscribe() {
  return (
    <StyledWrapper>
      <UnsubscribeIcon style={{ width: '20vw', height: '15vh' }} />
      <h2>You didn't subscribe any channel.</h2>
    </StyledWrapper>
  );
}
