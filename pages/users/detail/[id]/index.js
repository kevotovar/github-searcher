import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';

import { fetchUserDetail, fetchUserRepositories } from '../../../../services';
import UserDetailCard from '../../../../components/UserDetailCard';
import UserRepositories from '../../../../components/UserRepositories';

export async function getServerSideProps(context) {
  const [userDetail, userRepositories] = await Promise.all([
    fetchUserDetail(context.params.id),
    fetchUserRepositories(context.params.id, {
      per_page: 5,
      sort: 'indexed',
      order: 'asc',
    }),
  ]);
  if (userDetail.status === 200) {
    return {
      props: {
        userDetail: userDetail.data,
        userRepositories: userRepositories.data,
      },
    };
  }
  return {
    notFound: true,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function UserDetail({ userDetail, userRepositories }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Head>
        <title>{userDetail.name} profile</title>
      </Head>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UserDetailCard
            avatarUrl={userDetail.avatar_url}
            bio={userDetail.bio}
            email={userDetail.email}
            followers={userDetail.followers}
            following={userDetail.following}
            login={userDetail.login}
            name={userDetail.name}
            publicGists={userDetail.public_gists}
            publicRepos={userDetail.public_repos}
          />
        </Grid>
        <Grid item xs={12}>
          <UserRepositories userRepositories={userRepositories} />
        </Grid>
      </Grid>
    </div>
  );
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
  userRepositories: PropTypes.array,
};
