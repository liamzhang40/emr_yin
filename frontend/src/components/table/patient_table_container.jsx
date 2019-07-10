import { connect } from 'react-redux';
import Table from './table';
import {
  fetchAllPatients,
  deletePatients,
} from '../../actions/patient_actions';

const mapStateToProps = state => ({
  rows: state.entities.patients,
  columnHeads: state.entities.columnHeads,
  defaultRowsPerPage: Math.floor((window.innerHeight - 64 - 20 - 64 - 48 - 56 - 20) / 40),
  tableTitle: 'patient',
  path: '/patient/',
});

const mapDispatchToProps = dispatch => ({
  fetchRows: () => dispatch(fetchAllPatients()),
  deletePatients: patientIds => dispatch(deletePatients(patientIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);