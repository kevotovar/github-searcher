import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles({
  cardActions: {
    justifyContent: 'flex-end',
  },
});

export default function UserSearchCard({ login, avatarUrl }) {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={login} src={avatarUrl} />}
        title={login}
      />
      <CardActions className={styles.cardActions}>
        <Link passHref href={`/users/detail/${login}`}>
          <Button component="a">Watch</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

UserSearchCard.propTypes = {
  login: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};
