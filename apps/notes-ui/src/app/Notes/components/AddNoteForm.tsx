import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export interface CreateNoteOptions {
  title: string;
  body: string;
}

export interface Props {
  createNote: (options: CreateNoteOptions) => Promise<void>;
}

export default function AddNoteForm({ createNote }: Props) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title');
    const body = data.get('body');

    // HTML form has required fields anyway, this is to satisfy the TS
    const someValuesAreInvalid = [title, body].some((value) => !value);

    if (someValuesAreInvalid) {
      alert('Title and Name and body are requried fields');
      return;
    }

    await createNote({ title: String(title), body: String(body) });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            required
            fullWidth
            id="title"
            label="title"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            rows={2}
            required
            name="body"
            label="body"
            fullWidth
            id="body"
            placeholder="Write something special.."
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create
      </Button>
    </Box>
  );
}
