import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  ButtonBase,
  Typography,
  MenuItem,
  Menu,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logout } from '../../actions/session_actions';

const useStyles = makeStyles(theme => ({
  profileButtonIcon: {
    marginLeft: 5,
  },
}));

const AccountMenu = ({ firstName, lastName, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'primary-search-account-menu';

  return (
    <Fragment>
      <ButtonBase
        // variant="contained"
        color="inherit"
        className={classes.profileButton}
        onClick={handleMenuOpen}
      >
        <Typography>
          {`${firstName} ${lastName}`}
        </Typography>
        <AccountCircle className={classes.profileButtonIcon} />
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  firstName: state.session.firstName,
  lastName: state.session.lastName,
});

export default connect(mapStateToProps, {
  logout
})(AccountMenu);