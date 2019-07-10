import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
  Paper,
  Typography,
  Button,
  Grid,
 } from '@material-ui/core';
import FormTemplate from './form_template';
import VisitTableContainer from '../table/visit_table_container';

const styles = theme => ({
  paper: {
    width: '100%',
    boxSizing: 'border-box',
    padding: 20,
  },
  formTitle: {
    marginBottom: 20,
  },
  formBody: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  createPatient: {
    width: '100%'
  },
  updatePatient: {
    width: '48%'
  },
});

class PatienForm extends Component {
  constructor(props) {
    super(props);

    this.state = this._initializeFields();
  } 

  componentDidMount() {
    const { fetchPatient, match, patient } = this.props;

    if (!Object.keys(patient).length && fetchPatient) fetchPatient(match.params.patientId).then(() => {
      this.setState(this._initializeFields());
    });
  }

  _initializeFields = () => {
    return Object.keys(this.props.fields).reduce((accu, fieldName) => {
      accu[fieldName] = this.props.fields[fieldName].value || '';

      return accu;
    }, {});
  }

  _handleChange = fieldName => e => {
    this.setState({ [fieldName]: e.currentTarget.value });
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    const patient = {...this.state};
    if (this.props.patient) patient.id = this.props.patient.id;

    this.props.processForm(patient).then(() => {
      if (this.props.closeModal) this.props.closeModal();
    });
  }

  render() {
    const { 
      classes, 
      errors,
      fields, 
      formTitle, 
      formType, 
      match,
      submitText, 
    } = this.props;
    
    return formType === 'createPatient' ? 
      (
        <div className={classes.formBody}>
          <form className={classes[formType]}>
            <FormTemplate
              fields={fields}
              parentState={this.state}
              handleChange={this._handleChange}
              errors={errors}
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this._handleSubmit}
                >
                  {submitText}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      ) :
      (
        <Paper className={classes.paper}>
          <Typography className={classes.formTitle} component="h1" variant="h5">
            {formTitle}
          </Typography>
          <div className={classes.formBody}>
            <form className={classes[formType]}>
              <FormTemplate 
                fields={fields}
                parentState={this.state}
                handleChange={this._handleChange}
                errors={errors}
              />
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this._handleSubmit}
                  >
                    {submitText}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Fragment>
              <div style={{ width: '48%'}}>
                <VisitTableContainer match={match}/>
              </div>
            </Fragment>
          </div>
        </Paper>
      );
  }
}

export default withStyles(styles)(PatienForm);