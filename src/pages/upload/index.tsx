import EngineeringIcon from '@mui/icons-material/Engineering';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  margin-top: 7vw;
  text-align: center;
`;

export default function Upload() {
  return (
    <>
      <StyledWrapper>
        <EngineeringIcon style={{ width: '20vw', height: '15vh' }} />
        <h2>Sorry, I still working on the upload field...</h2>
        <h3>Would you mind trying the other pages?</h3>
      </StyledWrapper>
    </>
  );
}
