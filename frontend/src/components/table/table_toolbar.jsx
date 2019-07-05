import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils/string_utils';
import Dialog from '../dialog/dialog';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
}));

const TableToolbarEnhanced = props => {
  const { selected, tableTitle, path, deletePatients } = props;
  const classes = useToolbarStyles();
  const numSelected = selected.length;

  const _handleDelete = () => {
    deletePatients(selected);
  };

  return (
    <Toolbar>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {capitalize(tableTitle + 's')}
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Fragment>
            {
              numSelected === 1 &&
              <Tooltip title="Detail">
                <Link to={`${path}${selected[0]}`}>
                  <IconButton 
                    aria-label="Detail"
                  >
                    <InfoIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            }
            <Tooltip title="Delete">
              <IconButton 
                aria-label="Delete"
                onClick={_handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Dialog 
              dialogType={tableTitle}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Dialog 
              dialogType={tableTitle}
            />
          </Fragment>
          )}
      </div>
    </Toolbar>
  );
};

TableToolbarEnhanced.propTypes = {
  selected: PropTypes.array.isRequired,
};

export default TableToolbarEnhanced;