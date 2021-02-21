import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <Grid container justify="center" spacing={8}>
      <Grid item xs="12">
        <Typography variant="h4" align="center">
          Search a repository or a user
        </Typography>
      </Grid>
      <Grid item xs="12">
        <SearchBar />
      </Grid>
    </Grid>
  );
}
