import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

export interface ShareNoteOptions {
  email: string;
  name: string;
}

export interface Props {
  shareNote: (options: ShareNoteOptions) => Promise<void>;
}

const DEFAULT_VALUES = { email: '', name: '' };

export default function ShareNoteForm({ shareNote }: Props) {
  const [formValues, setFormValues] = React.useState(DEFAULT_VALUES);

  const [error, setError] = React.useState<string | null>(null);

  const handleChange =
    (fieldName: string) =>
    ({ target: { value } }: any) => {
      setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    };

  const validateForm = () => {
    if (formValues.email && formValues.name) {
      setError('You must specify only email or name, not both');
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email'));
    const name = String(data.get('name'));

    // HTML form has required fields anyway, this is to satisfy the TS
    const isFormInvalid = email && name;

    if (isFormInvalid) {
      alert('You must specify either email or name, not both!');
      return;
    }

    await shareNote({ email, name });

    setFormValues(DEFAULT_VALUES);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h5">
            Share your note with a friend
          </Typography>
          <br />
          <div>
            <TextField
              fullWidth
              type="email"
              value={formValues.email}
              onChange={handleChange('email')}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              onBlur={validateForm}
            />
            <br />
            <br />
            <Divider>
              <Chip label="OR" />
            </Divider>
            <br />
            <TextField
              fullWidth
              value={formValues.name}
              onChange={handleChange('name')}
              type="name"
              id="name"
              label="name"
              name="name"
              onBlur={validateForm}
              autoComplete="off"
            />
          </div>
        </Grid>
      </Grid>
      <br />
      {error && <Alert severity="error">{error}</Alert>}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Share
      </Button>
    </Box>
  );
}
