import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, login, clearErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  const { formType } = ownProps;

  switch (formType) {
    case "login":
      return {
        formType,
        formTitle: "Log in",
        link: {
          text: "Dont't have an account yet? Sign up",
          url: "/signup",
        },
        fields: {
          email: {
            required: true,
            type: "email",
            xs: 12,
            variant: 'outlined',
          },
          password: {
            required: true,
            type: "password",
            xs: 12,
            variant: 'outlined',
          },
        },
        errors: state.errors.session,
      };
    case "signup":
      return {
        formType,
        formTitle: "Sign up",
        link: {
          text: "Already have an account? Log in",
          url: "/login"
        },
        fields: {
          first_name: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'outlined',
          },
          last_name: {
            required: true,
            xs: 12,
            sm: 6,
            variant: 'outlined',
          },
          email: {
            required: true,
            xs: 12,
            type: "email",
            variant: 'outlined',
          },
          password: {
            required: true,
            xs: 12,
            type: "password",
            variant: 'outlined',
          },
        },
        errors: state.errors.session,
      };
    default:
      return {};
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { formType } = ownProps;

  switch (formType) {
    case "login":
      return {
        processForm: user => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors()),
      };
    case "signup":
      return {
        processForm: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors()),
      };
    default:
      return {};
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);