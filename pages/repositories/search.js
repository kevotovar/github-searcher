import Head from 'next/head';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import RepositorySearchCard from '../../components/RepositorySearchCard';
import { searchRepositories } from '../../services';

export async function getServerSideProps(context) {
  if (context.query.q) {
    try {
      const responseData = await searchRepositories({
        q: context.query.q,
        page: context.query.page,
        per_page: 10,
      });
      return {
        props: {
          repositoriesData: responseData.data,
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

export default function RepositoriesSearch({ repositoriesData, error }) {
  const styles = useStyles();
  const router = useRouter();
  const currentPage = Number(router.query.page || 1);
  const changePage = (_, value) => {
    router.push({
      query: {
        page: value,
        q: router.query.q,
      },
    });
  };
  const query = decodeURIComponent(router.query.q);
  if (error) {
    return 'error page';
  }
  if (repositoriesData) {
    const count = Math.min(repositoriesData.total_count / 30, 30);
    return (
      <div className={styles.root}>
        <Head>
          <title>Looking for: {query}</title>
        </Head>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            searchbar
          </Grid>
          {repositoriesData.items.map(({ id, full_name }) => (
            <Grid item xs={12} md={6} lg={4} key={id}>
              <RepositorySearchCard fullName={full_name} />
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
  return 'empty';
}
