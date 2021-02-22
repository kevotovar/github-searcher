import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import LinkIcon from '@material-ui/icons/Link';
import Link from 'next/link';

export default function OwnerCard({ owner }) {
  return (
    <Card>
      <CardHeader
        title={owner.login}
        subheader={owner.name ? `Owned by ${owner.name}` : undefined}
        avatar={<Avatar source={owner.avatar_url} alt={owner.login} />}
        action={
          <Link href={`/users/detail/${owner.login}`} passHref>
            <IconButton component="a">
              <LinkIcon />
            </IconButton>
          </Link>
        }
      />
    </Card>
  );
}

OwnerCard.propTypes = {
  owner: PropTypes.object.isRequired,
};
