import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import axios from 'axios';
import config from '../../config';
import { useHistory, useParams } from 'react-router-dom';
import ShareNoteForm, { ShareNoteOptions } from './components/ShareNoteForm';
import {
  useAuth,
  User,
} from '../../shared/providers/AuthProvider/authProvider';
import NoteCard from './components/NoteCard';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface Note {
  id: number;
  title: string;
  body: string;
  isShared: boolean;
  createdByUserId: number;
  sharedWithUsers: User[];
}

const theme = createTheme();

export const NotePage = () => {
  const { noteId } = useParams<any>();
  const [errorSnackbarOpen, setErrorSnackbarOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorSnackbarOpen(false);
  };

  const history = useHistory();
  const auth = useAuth();
  const [fetchedNote, setFetchedNote] = React.useState<Note | null>(null);

  const fetchNote = async () => {
    if (!noteId) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.apiHost}/api/v1/notes/${noteId?.toString()}`
      );

      if (response.data) {
        setFetchedNote({
          ...response.data,
        });
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  React.useEffect(() => {
    fetchNote();
  }, [noteId, auth.user?.id]);

  const handleShareNote = async ({ email, name }: ShareNoteOptions) => {
    try {
      await axios.post(`${config.apiHost}/api/v1/notes/${noteId}/share`, {
        email,
        name,
      });

      await fetchNote();
    } catch (error: any) {
      console.error('Share note error', error);

      // mvp only, proper error handling to be implemented
      if (error?.response?.data?.message === 'User not found') {
        setErrorSnackbarOpen(true);
      }
    }
  };

  const sharedUsers =
    fetchedNote?.sharedWithUsers && Array.isArray(fetchedNote?.sharedWithUsers)
      ? fetchedNote.sharedWithUsers
      : [];

  if (!noteId) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/** THIS IS ONLY HARDCODED FOR MVP */}
        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            User does not exists, try other name or email..
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href="/notes"
                onClick={() => history.push('/notes')}
              >
                Notes
              </Link>
              <Typography color="text.primary">Note # {noteId}</Typography>
            </Breadcrumbs>
          </div>

          <br />

          {fetchedNote && (
            <NoteCard title={fetchedNote?.title} body={fetchedNote?.body} />
          )}
          <br />
          <br />
          {fetchedNote?.createdByUserId === auth.user?.id && (
            <>
              <ShareNoteForm shareNote={handleShareNote} />
              <br />
              <List>
                {sharedUsers.length === 0 ? (
                  <p>
                    You have not shared this note with anyone. Let's share
                    something <FavoriteIcon />
                  </p>
                ) : null}
                {sharedUsers.length > 0 && (
                  <>
                    <Typography component="h2" variant="h5">
                      <FavoriteIcon /> Note already shared with:
                    </Typography>
                    {sharedUsers.map((sharedUser) => (
                      <ListItem key={sharedUser.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={sharedUser.email}
                          secondary={sharedUser.name}
                        />
                      </ListItem>
                    ))}
                  </>
                )}
              </List>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
