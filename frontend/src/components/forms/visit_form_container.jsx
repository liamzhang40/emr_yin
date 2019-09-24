import { connect } from 'react-redux';
import {
  fetchVisit,
  updateVisit,
  createVisit,
} from '../../actions/visit_actions';
import { states } from '../../constants/constant';
import VisitForm from './visit_form';

const mapStateToProps = (state, ownProps) => {
  const { formType, match } = ownProps;

  switch (formType) {
    case "createVisit":
      return {
        visit: {},
        formType,
        submitText: "Save",
        fields: {
          purpose_of_visit: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          appointment_time: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          visit_details: {
            required: true,
            // xs: 12,
            sm: 12,
            variant: 'filled',
            multiline: true,
          },
        },
        errors: state.errors.visit,
      };
    case "updateVisit":
      const visit = state.entities.visits[match.params.visitId] || {};

      return {
        visit,
        formType,
        formTitle: "Visit Details",
        submitText: "Update",
        fields: {
          purpose_of_visit: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          appointment_time: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'filled',
          },
          visit_details: {
            required: true,
            xs: 12,
            sm: 12,
            variant: 'filled',
            multiline: true,
          },
        },
        errors: state.errors.visit,
      };
    default:
      return {};
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { formType } = ownProps;

  switch (formType) {
    case "createVisit":
      return {
        processForm: visit => dispatch(createVisit(visit)),
      };
    case "updateVisit":
      return {
        processForm: visit => dispatch(updateVisit(visit)),
        fetchVisit: visitId => dispatch(fetchVisit(visitId)),
      };
    default:
      return {};
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitForm);