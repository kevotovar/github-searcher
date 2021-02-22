import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import { fetchRepository } from '../../../../services';
import RepositoryDetailCard from '../../../../components/RepositoryDetailCard';
import OwnerCard from '../../../../components/OwnerCard';
import RepositoryStatsCard from '../../../../components/RepositoryStatsCard';

export async function getServerSideProps(context) {
  const { id, repo } = context.params;
  const { status, data } = await fetchRepository(id, repo);
  if (status === 200) {
    return {
      props: { data },
    };
  }
  return { notFound: true };
}

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function UserRepository({ data }) {
  const styles = useStyles();
  return (
    <>
      <Head>
        <title>{data.name} repository</title>
      </Head>
      <div className={styles.root}>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
            <RepositoryDetailCard
              name={data.name}
              homepage={data.homepage}
              fullName={data.full_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OwnerCard owner={data.owner} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RepositoryStatsCard
              forks={data.forks}
              watchers={data.watchers_count}
              stargazers={data.stargazers_count}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

UserRepository.propTypes = {
  data: PropTypes.object.isRequired,
};
