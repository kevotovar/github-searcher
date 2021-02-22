import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const VALIDATION_SCHEMA = yup.object().shape({
  text: yup.string().min(3).required(),
});

const useStyles = makeStyles({
  paper: {
    display: 'flex',
  },
  textField: {
    flex: 1,
  },
});

export default function SingleSearchBar() {
  const router = useRouter();
  const styles = useStyles();
  const query = encodeURIComponent(router.query.q);
  const onSubmit = (values) => {
    return router.push({
      pathname: router.pathname,
      query: {
        q: values.text,
      },
    });
  };
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { text: query !== 'undefined' ? query : '' },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Paper className={styles.paper}>
        <TextField
          placeholder="Enter search value"
          value={values.text}
          name="text"
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.textField}
        />
        <Button type="submit" color="primary">
          Search
        </Button>
      </Paper>
    </form>
  );
}
