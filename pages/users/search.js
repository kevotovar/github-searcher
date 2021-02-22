import Head from 'next/head';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import UserSearchCard from '../../components/UserSearchCard';
import SingleSearchBar from '../../components/SingleSearchBar';
import { searchUser } from '../../services';

export async function getServerSideProps(context) {
  if (context.query.q) {
    try {
      const responseData = await searchUser({
        q: context.query.q,
        page: context.query.page,
      });
      return {
        props: {
          usersData: responseData.data,
          q: context.query.q,
        },
      };
    } catch (error) {
      return {
        props: {
          error: true,
        },
      };
    }
  }

  return {
    props: {},
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    flexGrow: 1,
  },
}));

export default function UsersSearch({ usersData, error }) {
  const styles = useStyles();
  const router = useRouter();
  const currentPage = Number(router.query.page || 1);
  const query = decodeURIComponent(router.query.q);
  const changePage = (_, value) => {
    router.push({
      query: {
        page: value,
        q: query,
      },
    });
  };
  if (error) {
    return 'error page';
  }
  if (usersData) {
    const count = Math.min(usersData.total_count / 30, 30);
    return (
      <div className={styles.root}>
        <Head>
          <title>Lookin for: {decodeURIComponent(query)}</title>
        </Head>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SingleSearchBar />
          </Grid>
          {usersData.items.map(({ id, login, avatar_url }) => (
            <Grid item xs={12} md={6} lg={4} key={id}>
              <UserSearchCard login={login} avatarUrl={avatar_url} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Pagination
              count={count}
              color="primary"
              variant="outlined"
              shape="rounded"
              page={currentPage}
              onChange={changePage}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <Head>
        <title>Lookin for: {decodeURIComponent(query)}</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SingleSearchBar />
        </Grid>
      </Grid>
    </div>
  );
}

UsersSearch.propTypes = {
  usersData: PropTypes.object,
  error: PropTypes.bool,
};
