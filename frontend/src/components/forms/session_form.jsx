import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as NavTo } from 'react-router-dom';
import FormTemplate from './form_template';

function FormErrorRenderer ({ errors }) {
  return (
    errors.map((error, idx) => (
      <Typography key={idx} variant="body2" color="error" align="center">
        {error}
      </Typography>
    ))
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class UserForm extends Component { 
  constructor(props) {
    super(props);

    this.state = Object.keys(this.props.fields).reduce((accu, fieldName) => {
      accu[fieldName] = "";

      return accu;
    }, {});
  }

  _handleSubmit = e => {
    e.preventDefault();

    this.props.processForm(this.state).then(res => {
      if (res) {
        this.props.history.push('/')
      }
    })
  }

  _handleChange = fieldName => e => {
    this.setState({[fieldName]: e.currentTarget.value});
  }
  
  render() {
    const { classes, formTitle, link, fields, errors, clearErrors } = this.props;

    return (
      <Container className="" component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {formTitle}
          </Typography>
          <form className={classes.form} noValidate autoComplete="off">
            <FormTemplate 
              fields={fields}
              parentState={this.state}
              handleChange={this._handleChange}
              errors={errors}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this._handleSubmit}
            >
              {formTitle}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                {
                  link &&
                  <Link component={NavTo} to={link.url} variant="body2" onClick={() => clearErrors()}>
                    {link.text}
                  </Link>
                }
              </Grid>
            </Grid>
          </form>
        </div>
        {
          Array.isArray(errors) &&
          <Box mt={5}>
            <FormErrorRenderer errors={errors}/>
          </Box>
        }
      </Container>
    );
  }
}

export default withStyles(styles)(UserForm);