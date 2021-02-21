import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const VALIDATION_SCHEMA = yup.object().shape({
  select: yup.string().required(),
  text: yup.string().min(3).required(),
});

const selectOptions = [
  {
    value: 'users',
    text: 'Users',
  },
  {
    value: 'repositories',
    text: 'Repositories',
  },
];

const initialValues = {
  select: 'users',
  text: '',
};

const useStyles = makeStyles({
  paper: {
    display: 'flex',
  },
  textField: {
    flex: 1,
  },
  select: {
    width: 150,
  },
});

function renderSelectOptions({ value, text }) {
  return (
    <MenuItem key={value} value={value}>
      {text}
    </MenuItem>
  );
}

export default function SearchBar() {
  const router = useRouter();
  const styles = useStyles();
  const onSubmit = (values) => {
    if (values.select === 'users') {
      return router.push(`/users/search?q=${values.text}`);
    }
    return router.push(`/repositories/search?q=${values.text}`);
  };
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Paper className={styles.paper}>
        <Select
          value={values.select}
          name="select"
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.select}
        >
          {selectOptions.map(renderSelectOptions)}
        </Select>
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
