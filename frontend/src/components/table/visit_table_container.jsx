import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Table from './table';
import { fetchAllVisits } from '../../actions/visit_actions';

const mapStateToProps = (state, ownProps) => ({
  rows: state.entities.visits,
  columnHeads: state.entities.columnHeads.visit,
  defaultRowsPerPage: Math.floor((window.innerHeight - 64 - 20 - 20 - 31.25 - 64 - 48 - 56 - 20) / 40),
  tableTitle: "visit",
  path: `${ownProps.match.url}/visit/`,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchRows: () => dispatch(fetchAllVisits(ownProps.match.params.patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);