import React from 'react';
import PropTypes from 'prop-types';
// import { lighten, makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core';
import { hiddenColumns } from '../../utils/table_utils';
import { snakeToTitle } from '../../utils/string_utils';

// const headRows = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];
const useStyles = makeStyles(theme => ({
  root: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export default function TableHeadEnhanced(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columnHeads } = props;
  const classes = useStyles();
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {
            Boolean(columnHeads.length) &&
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'Select all desserts' }}
            />
          }
        </TableCell>
        {
          columnHeads.reduce((accu, head, idx) => {
            if (!hiddenColumns.includes(head)) {
              accu.push(
                <TableCell
                  key={idx}
                  // align={row.numeric ? 'right' : 'left'}
                  // padding={row.disablePadding ? 'none' : 'default'}
                  // sortDirection={orderBy === row.id ? order : false}
                >
                  <TableSortLabel
                    className={classes.root}
                    active={orderBy === head}
                    direction={order}
                    onClick={createSortHandler(head)}
                  >
                    {snakeToTitle(head)}
                  </TableSortLabel>
                </TableCell>
              );
            }

            return accu;
          }, [])
        }
      </TableRow>
    </TableHead>
  );
}

TableHeadEnhanced.propTypes = {
  columnHeads: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

TableHeadEnhanced.defaultProps = {
  columnHeads: []
};