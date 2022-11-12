import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function NoteCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        {' '}
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Your note:
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">{body}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
