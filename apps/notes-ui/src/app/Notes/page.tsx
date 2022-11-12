import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import NoteIcon from '@mui/icons-material/Note';
import CssBaseline from '@mui/material/CssBaseline';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import AddNoteForm, { CreateNoteOptions } from './components/AddNoteForm';
import { useAuth } from '../../shared/providers/AuthProvider/authProvider';
import { useHistory } from 'react-router-dom';

export interface Note {
  id: number;
  title: string;
  body: string;
  isShared: boolean;
}

const theme = createTheme();

export const NotesPage = () => {
  const history = useHistory();
  const [notes, setNotes] = useState<Note[]>([]);
  const auth = useAuth();

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${config.apiHost}/api/v1/notes`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const notesToBeSet = response.data.map((note: any) => {
        return {
          ...note,
          isShared: note.createdByUserId !== auth?.user?.id,
        };
      });

      setNotes(notesToBeSet);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [auth.user?.id]);

  const handleDelete = (noteId: number) => async () => {
    const isActionConfirmed = window.confirm(
      'Do you really want to delete this note?'
    );
    if (isActionConfirmed) {
      try {
        await axios.delete(`${config.apiHost}/api/v1/notes/${noteId}`);
        await fetchNotes();
      } catch (error) {
        console.error('Delete note error', error);
      }
    }
  };

  const handleCreateNote = async ({ title, body }: CreateNoteOptions) => {
    try {
      await axios.post(`${config.apiHost}/api/v1/notes`, {
        title,
        body,
      });
      await fetchNotes();
    } catch (error) {
      console.error('Create note error', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h4> Add note:</h4>
          <AddNoteForm createNote={handleCreateNote} />
          {notes.length === 0 ? (
            <h4> You have no notes yet.. Why don't you add one?</h4>
          ) : null}
          {notes.length > 0 ? <h4> Your notes:</h4> : null}
          <List>
            {notes.map((note) => (
              <ListItem
                key={note.id}
                secondaryAction={
                  !note.isShared ? (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={handleDelete(note.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null
                }
              >
                {note.isShared && (
                  <Chip label="Someone shared with you" variant="outlined" />
                )}
                <ListItemAvatar>
                  <Avatar>
                    {note.isShared ? <ShareIcon /> : <NoteIcon />}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary={note.title} secondary={note.body} />

                <IconButton
                  edge="end"
                  aria-label="share"
                  onClick={() => history.push(`/note/${note.id}`)}
                >
                  {note.isShared ? <PreviewIcon /> : <EditIcon />}
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
