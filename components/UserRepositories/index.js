import PropTypes from 'prop-types';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';

export default function UserRepositories({ userRepositories }) {
  if (userRepositories.length) {
    return (
      <Grid container item spacing={4}>
        {userRepositories.map(({ id, name, full_name }) => (
          <Grid item xs={12} key={id}>
            <Card>
              <CardHeader
                title={name}
                action={
                  <Link href={`/users/detail/${full_name}`}>
                    <IconButton component="a">
                      <LinkIcon />
                    </IconButton>
                  </Link>
                }
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Card>
      <CardContent>
        <Typography>No repositories found</Typography>
      </CardContent>
    </Card>
  );
}

UserRepositories.propTypes = {
  userRepositories: PropTypes.array.isRequired,
};
