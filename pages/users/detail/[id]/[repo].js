import { fetchRepository } from '../../../../services';

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

export default function UserRepository() {
  return <div>empty</div>;
}
