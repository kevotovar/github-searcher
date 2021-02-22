import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from 'next/link';

export default function RepositoryDetailCard({ name, fullName }) {
  return (
    <Card>
      <CardHeader
        title={name}
        action={
          <Link href={`https://github.com/${fullName}`} passHref>
            <IconButton component="a" target="_blank">
              <GitHubIcon />
            </IconButton>
          </Link>
        }
      />
    </Card>
  );
}

RepositoryDetailCard.propTypes = {
  name: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};
