import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles({
  cardActions: {
    justifyContent: 'flex-end',
  },
});

export default function UserSearchRepository({ fullName }) {
  const styles = useStyles();
  return (
    <Card>
      <CardHeader title={fullName} />
      <CardActions className={styles.cardActions}>
        <Link passHref href={`/users/detail/${fullName}`}>
          <Button component="a">Watch</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

UserSearchRepository.propTypes = {
  fullName: PropTypes.string.isRequired,
};
