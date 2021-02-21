import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import UserSearchCard from '../../components/UserSearchCard';
import { searchUser } from '../../services';

export async function getServerSideProps(context) {
  if (context.query.q) {
    const responseData = await searchUser({
      q: context.query.q,
      page: context.query.page,
    });
    return {
      props: {
        usersData: responseData.data,
      },
    };
  }

  return {
    props: {},
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    padding: theme.spacing(2),
  },
}));

export default function UsersSearch({ usersData }) {
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
  if (usersData) {
    const count = Math.ceil(usersData.total_count / 30);
    return (
      <Grid container item className={styles.root} spacing={2}>
        <Grid item xs={12}>
          searchbar
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
    );
  }
  return 'empty';
}
