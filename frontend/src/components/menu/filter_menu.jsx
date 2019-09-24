import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Popover,
} from '@material-ui/core';
import { hiddenColumns } from '../../constants/constant';
import { snakeToTitle } from '../../utils/string_utils';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px"
  },
}));

const FilterMenu = ({ setTableFilters, columnHeads }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = useState({});

  const _handleChange = filterName => event => {
    const newState = {
      ...filters,
      [filterName]: event.currentTarget.value,
    };

    setFilters(newState);
  }

  const _handleClear = () => {
    setFilters({})
  }

  const _handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const _handleMenuClose = () => {
    setTableFilters(filters);
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'primary-filter-patient-menu';

  const filterOptions = columnHeads.reduce((accu, head, idx) => {
    if (
      !hiddenColumns.includes(head) &&
      head !== "age" &&
      head !== "gender" &&
      head !== "street_address" &&
      head !== "city" &&
      head !== "state" &&
      head !== "zip"
    ) {
      accu.push(
        <TextField key={idx}
          id="filter input"
          label={snakeToTitle(head)}
          // className={classes.textField}
          value={filters[head] || ""}
          onChange={_handleChange(head)}
          margin="normal"
        />
      );
    }

    return accu;
  }, []);

  return (
    <Fragment>
      <Tooltip title="Filter list"
        onClick={_handleMenuOpen}
      >
        <IconButton aria-label="Filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        classes={{ paper: classes.paper }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        id={menuId}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={_handleMenuClose}
      >
        <form className={classes.form}>
          <Typography className={classes.title}>FILTERS</Typography>
          {filterOptions}
          <Button 
            variant="text"
            color="secondary"
            onClick={_handleClear}
          >
            Clear
          </Button>
        </form>
      </Popover>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  columnHeads: state.entities.columnHeads[ownProps.filterType],
});

export default connect(mapStateToProps, {
})(FilterMenu);