import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import styled from 'styled-components';

const PictureWrapper = styled.div`
  height: 160px;
  width: 300px;
  position: relative;
  background: black;
`;

const FixedImg = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export default function UserVideoArea(props: any) {
  const { channelVideoList } = props;

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '30%' }} />
                <TableCell>
                  <Typography style={{ fontWeight: 600 }}>Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: 600 }}>
                    Create Time
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: 600 }}>Comment</Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: 600 }}>Like</Typography>
                </TableCell>
                <TableCell>
                  <Typography style={{ fontWeight: 600 }}>Dislike</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channelVideoList.map((item: any) => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      <NoStyleLink to={`/video/${item._id}`} target='_blank'>
                        <PictureWrapper>
                          <FixedImg alt='videoPic' src={item.coverURL} />
                        </PictureWrapper>
                      </NoStyleLink>
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      {moment(item.updateAt).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell>{item.commentCount}</TableCell>
                    <TableCell>{item.likeCount}</TableCell>
                    <TableCell>{item.dislikeCount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
