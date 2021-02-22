import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  emptyBio: {
    fontWeight: 'bold',
    color: theme.palette.grey[400],
  },
}));

export default function UserDetailCard({
  avatarUrl,
  bio,
  email,
  followers,
  following,
  login,
  name,
  publicGists,
  publicRepos,
}) {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatarUrl} alt={login} />}
        title={login}
        subheader={name}
        action={
          <IconButton
            component="a"
            target="_blank"
            href={`https://github.com/${login}`}
          >
            <GitHubIcon />
          </IconButton>
        }
      />
      <CardContent>
        {bio ? (
          <Typography>{bio}</Typography>
        ) : (
          <Typography className={styles.emptyBio}>Empty bio</Typography>
        )}
      </CardContent>
    </Card>
  );
}

UserDetailCard.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  bio: PropTypes.string,
  email: PropTypes.string,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  name: PropTypes.string,
  publicGists: PropTypes.number,
  publicRepos: PropTypes.number,
};
