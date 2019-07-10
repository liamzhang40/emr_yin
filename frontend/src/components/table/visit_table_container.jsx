import { connect } from 'react-redux';
import Table from './table';
// import { fetchAllPatients } from '../../actions/patient_actions';

const mapStateToProps = (state, ownProps) => ({
  // rows: state.entities.patients,
  // columnHeads: state.entities.columHeads,
  defaultRowsPerPage: Math.floor((window.innerHeight - 64 - 20 - 20 - 31.25 - 64 - 48 - 56 - 20) / 40),
  tableTitle: "visit",
  path: `${ownProps.match.url}/visit/`,
});

const mapDispatchToProps = dispatch => ({
  // fetchRows: () => dispatch(fetchAllPatients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);