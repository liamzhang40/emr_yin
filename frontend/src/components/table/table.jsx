import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@material-ui/core';
import { parseTabelCellText } from '../../utils/table_utils';
import { hiddenColumns } from '../../constants/constant';
import TableHeadEnhanced from './table_head';
import TableToolbarEnhanced from './table_toolbar';

function stableSort(array, cmp) {
  array.sort((a, b) => {
    const order = cmp(a, b);
    if (order !== 0) return order;
    return 1;
  });

  return array;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
  },
  table: {
    // minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    height: 28,
  }
}));

export default function TableEnhanced(props) {
  const { rows, columnHeads, defaultRowsPerPage, tableTitle, path, deletePatients, history } = props;
  const rowArr = Object.values(rows);
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('first_name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (props.fetchRows) {
      props.fetchRows();
    }
  }, []);

  // useEffect(() => {
  //   setPage(0);
  // }, [filters]);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rowArr.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleNavigation (rowId) {
    return function () {
      history.push(`${path}${rowId}`);
    };
  }

  const isSelected = id => selected.indexOf(id) !== -1;

  const sortedRows = stableSort(rowArr, getSorting(order, orderBy));
  const filteredRows = sortedRows.filter(row => {
    for (let filterName in filters) {
      if (!row[filterName].toLowerCase().includes(filters[filterName].toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  const rowsToRender = [];
  for (let idx1 = page * rowsPerPage; rowsToRender.length < rowsPerPage && idx1 < filteredRows.length; idx1++) {
    const row = filteredRows[idx1];
    const isItemSelected = isSelected(row.id);
    const labelId = `enhanced-table-checkbox-${idx1}`;

    rowsToRender.push(
      <TableRow
        hover
        onClick={event => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        onDoubleClick={handleNavigation(row.id)}
      >
        {
          columnHeads.reduce((accu, head, idx2) => {
            if (
              !hiddenColumns.includes(head) &&
              head !== "street_address" &&
              head !== "city" &&
              head !== "state" &&
              head !== "zip"
            ) {
              accu.push(
                <TableCell key={idx2} className={classes.tableCell}>
                  {parseTabelCellText(head, row[head])}
                </TableCell>
              );
            }

            return accu;
          }, [
              <TableCell padding="checkbox" key="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
            ])
        }
      </TableRow>
    );
  }

  const emptyRows = rowsPerPage - rowsToRender.length;

  return (
    <Paper className={classes.paper}>
      <TableToolbarEnhanced 
        deletePatients={deletePatients}
        path={path}
        selected={selected}
        tableTitle={tableTitle}
        setTableFilters={setFilters}
      />
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
        >
          <TableHeadEnhanced
            columnHeads={props.columnHeads}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rowArr.length}
          />
          <TableBody>
            {rowsToRender}
            {emptyRows > 0 && (
              <TableRow style={{ height: 40 * emptyRows }}>
                <TableCell colSpan={columnHeads.length + 1} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

TableEnhanced.defaultProps = {
  columnHeads: [],
  rows: []
};