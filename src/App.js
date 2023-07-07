import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  cardDescription: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        'https://api.gyanibooks.com/library/get_dummy_notes'
      );
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" className={classes.title}>
        Dummy Notes
      </Typography>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2" className={classes.cardTitle}>
                  {note.title}
                </Typography>
                <Typography color="textSecondary" className={classes.cardDescription}>
                  {note.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
