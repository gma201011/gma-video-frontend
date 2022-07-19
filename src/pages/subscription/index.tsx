import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts';
import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LaunchIcon from '@mui/icons-material/Launch';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { getSubscribeChannel } from '../../webApi';
import UnsubscribeDialog from './UnsubscribeDialog';

interface Column {
  id: 'channel' | 'channeldes' | 'subscribeCount' | 'createAt';
  label: string;
  width?: string | number;
}

const columns: readonly Column[] = [
  { id: 'channel', label: 'Channel', width: '20%' },
  {
    id: 'subscribeCount',
    label: 'Subscribers',
    width: '15%',
  },
  {
    id: 'createAt',
    label: 'Established on',
    width: '15%',
  },
  { id: 'channeldes', label: 'Description', width: '40%' },
];

export default function Subscription() {
  const { user } = useContext(AuthContext);
  const [subscribeList, setSubscribeList] = useState<any>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogChannelName, setDialogChannelName] = useState('');
  const [dialogChannelId, setDialogChannelId] = useState('');

  useEffect(() => {
    if (!user) return;
    getSubscribeChannel(user?._id).then((res) => setSubscribeList(res));
  }, [user]);

  const handleUnsubscribeButtonOnClick = (
    channelId: string,
    channelName: string
  ) => {
    setDialogOpen(true);
    setDialogChannelName(channelName);
    setDialogChannelId(channelId);
  };

  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Subscription</h2>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ width: column.width }}>
                    <Typography style={{ fontWeight: 600 }}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!subscribeList ? (
              <div
                style={{
                  margin: '50px 0',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <TableBody>
                {subscribeList.map((item: any, index: number) => {
                  return (
                    <TableRow
                      key={item._id}
                      hover
                      role='checkbox'
                      tabIndex={-1}
                    >
                      <TableCell>
                        <CardHeader
                          style={{ padding: '16px 0' }}
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label='recipe'
                            >
                              {item.username[0]}
                            </Avatar>
                          }
                          title={
                            <Typography
                              noWrap
                              variant='body2'
                              color='text.secondary'
                            >
                              {item.username}
                            </Typography>
                          }
                        />
                      </TableCell>
                      <TableCell>{item.subscribeCount}</TableCell>
                      <TableCell>
                        {moment(item.createAt).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>{item.channeldes}</TableCell>
                      <TableCell>
                        <NoStyleLink
                          to={`/channel/${item._id}`}
                          target='_blank'
                        >
                          <Tooltip title='Visit the channel'>
                            <LaunchIcon />
                          </Tooltip>
                        </NoStyleLink>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleUnsubscribeButtonOnClick(
                              item._id,
                              item.username
                            )
                          }
                          style={{ color: 'gray' }}
                        >
                          <Tooltip title='Unsubscribe'>
                            <UnsubscribeIcon />
                          </Tooltip>
                        </Button>
                      </TableCell>
                      <UnsubscribeDialog
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                        channelName={dialogChannelName}
                        channelId={dialogChannelId}
                        subscribeList={subscribeList}
                        setSubscribeList={setSubscribeList}
                      />
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
