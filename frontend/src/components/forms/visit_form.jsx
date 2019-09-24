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
  createVisit: {
    width: '100%'
  },
  updateVisit: {
    width: '48%'
  },
});

class VisitForm extends Component {
  constructor(props) {
    super(props);

    this.state = this._initializeFields();
  }

  componentDidMount() {
    const { fetchVisit, match, visit } = this.props;

    if (!Object.keys(visit).length && fetchVisit) fetchVisit(match.params.visitId).then(() => {
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

    const visit = { ...this.state };
    if (this.props.visit) visit.id = this.props.visit.id;

    this.props.processForm(visit).then(() => {
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
      history,
      submitText,
    } = this.props;

    return formType === 'createVisit' ?
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
              <div style={{ width: '48%' }}>
                <VisitTableContainer match={match} history={history} />
              </div>
            </Fragment>
          </div>
        </Paper>
      );
  }
}

export default withStyles(styles)(VisitForm);