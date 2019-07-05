import React from 'react';
import PatientTableContainer from '../table/patient_table_container';
import { Route } from 'react-router-dom';
import UpdatePatientFormContainer from '../forms/patient_form_container';

const DashboardBody = () => {
  return (
    <div className="dashboard-body">
      <Route path='/' exact component={PatientTableContainer}/>
      <Route path='/patient/:patientId' render={props => <UpdatePatientFormContainer {...props} formType="updatePatient" />} />
    </div>
  );
};

export default DashboardBody;