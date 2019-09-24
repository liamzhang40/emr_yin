import { connect } from 'react-redux';
import { 
  fetchPatient,
  updatePatient,
  createPatient,
} from '../../actions/patient_actions';
import { states } from '../../constants/constant';
import PatientForm from './patient_form';

const mapStateToProps = (state, ownProps) => {
  const { formType, match } = ownProps;

  switch (formType) {
    case "createPatient":
      return {
        patient: {},
        formType,
        submitText: "Save",
        fields: {
          first_name: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          last_name: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          gender: {
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
            componentType: "select",
            options: [
              { value: "M", text: "M" },
              { value: "F", text: "F" },
            ]
          },
          date_of_birth: {
            required: true,
            xs: 12,
            sm: 4,
            type: "date",
            variant: 'filled',
          },
          age: {
            required: true,
            xs: 12,
            sm: 4,
            type: "number",
            variant: 'filled',
          },
          phone_number: {
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          email: {
            xs: 12,
            sm: 6,
            type: "email",
            variant: 'filled',
          },
          street_address: {
            required: true,
            xs: 12,
            variant: 'filled',
          },
          city: {
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
          },
          state: {
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
            componentType: "select",
            options: states.map(stateObj => ({
              value: stateObj.abbreviation,
              text: stateObj.abbreviation,
            }))
          },
          zip: {
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
          },
          description: {
            xs: 12,
            variant: 'filled',
          }
        },
        errors: state.errors.patient,
      };
    case "updatePatient":
      const patient = state.entities.patients[match.params.patientId] || {};

      return {
        patient,
        formType,
        formTitle: "Patient Details",
        submitText: "Update",
        fields: {
          // change to use columnHeads
          first_name: {
            value: patient.first_name,
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          last_name: {
            value: patient.last_name,
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          gender: {
            value: patient.gender,
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
          },
          date_of_birth: {
            value: patient.date_of_birth,
            required: true,
            xs: 12,
            sm: 4,
            type: "date",
            variant: 'filled',
          },
          age: {
            value: patient.age,
            required: true,
            xs: 12,
            sm: 4,
            type: "number",
            variant: 'filled',
          },
          phone_number: {
            value: patient.phone_number,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          email: {
            value: patient.email,
            xs: 12,
            sm: 6,
            type: "email",
            variant: 'filled',
          },
          street_address: {
            value: patient.street_address,
            required: true,
            xs: 12,
            variant: 'filled',
          },
          city: {
            value: patient.city,
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
          },
          state: {
            value: patient.state,
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
            componentType: "select",
            options: states.map(stateObj => ({
              value: stateObj.abbreviation,
              text: stateObj.abbreviation,
            }))
          },
          zip: {
            value: patient.zip,
            required: true,
            xs: 12,
            sm: 4,
            variant: 'filled',
          },
          description: {
            value: patient.description,
            xs: 12,
            variant: 'filled',
          },
        },
        errors: state.errors.patient,
      };
    default:
      return {};
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { formType } = ownProps;

  switch (formType) {
    case "createPatient":
      return {
        processForm: patient => dispatch(createPatient(patient)),
      };
    case "updatePatient":
      return {
        processForm: patient => dispatch(updatePatient(patient)),
        fetchPatient: patientId => dispatch(fetchPatient(patientId)),
      };
    default:
      return {};
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);