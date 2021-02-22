import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import { GitForkIcon, StarFillIcon, EyeIcon } from '@primer/octicons-react';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function RepositoryStatsCard({ forks, stargazers, watchers }) {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      <CardActions>
        <div>
          <GitForkIcon className={styles.icon} />
          {forks}
        </div>
        <div>
          <StarFillIcon className={styles.icon} />
          {stargazers}
        </div>
        <div>
          <EyeIcon className={styles.icon} />
          {watchers}
        </div>
      </CardActions>
    </Card>
  );
}

RepositoryStatsCard.propTypes = {
  forks: PropTypes.number.isRequired,
  stargazers: PropTypes.number.isRequired,
  watchers: PropTypes.number.isRequired,
};
