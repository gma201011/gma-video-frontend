import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin-top: 7vw;
  text-align: center;
`;

export default function NoSaveScreen() {
  return (
    <StyledWrapper>
      <ImageNotSupportedIcon style={{ width: '20vw', height: '15vh' }} />
      <h2>You didn't save any video.</h2>
    </StyledWrapper>
  );
}
