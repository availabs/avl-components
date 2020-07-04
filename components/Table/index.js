import React from 'react'
import {
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
  useExpanded
} from 'react-table'
// import {CSVLink, CSVDownload} from 'react-csv';

// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'

import { useTheme } from "../../wrappers/with-theme"

const DefaultColumnFilter = ({ column }) => {
  const {
      filterValue = "",
      preFilteredRows,
      setFilter
    } = column,
    count = preFilteredRows.length;
  return (
    <input className="px-2 rounded"
      value={ filterValue }
      onChange={ e => setFilter(e.target.value) }
      placeholder={ `Search...` }/>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = val => !val;

export default ({ columns, data, onRowClick, ...props }) => {
    const theme = useTheme();
    const filterTypes = React.useMemo(
      () => ({
          fuzzyText: fuzzyTextFilterFn,
          text: (rows, id, filterValue) => {
              return rows.filter(row => {
                  const rowValue = row.values[id];
                  return rowValue !== undefined
                      ? String(rowValue)
                          .toLowerCase()
                          .startsWith(String(filterValue).toLowerCase())
                      : true
              })
          },
          multi: (rows, id, filterValue) => {
              return rows.filter(row => {
                  const rowValue = row.values[id];
                  return rowValue !== undefined && filterValue.length
                      ? filterValue.map(fv => String(fv).toLowerCase()).includes(String(rowValue).toLowerCase())
                      : true
              })
          },
      }), []
    );

    const defaultColumn = React.useMemo(
      () => ({ Filter: DefaultColumnFilter }), []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        { columns,
          data,
          defaultColumn, // Be sure to pass the defaultColumn option
          filterTypes
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy,
        useExpanded,
        usePagination
    );
    if (!rows) return null;

    return (
        <table { ...getTableProps() } className="w-full">
          <thead>
            { headerGroups.map(headerGroup =>
                <tr { ...headerGroup.getHeaderGroupProps() }>
                  { headerGroup.headers
                      .map(column =>
                        <th { ...column.getHeaderProps() }
                          className={ theme.tableHeader }>
                            <div { ...column.getSortByToggleProps() }>
                              <div className="flex">
                                <div className="flex-0">{ column.render("Header") }</div>
                                <div className="flex-1 flex justify-end mr-8">
                                  { column.isSorted
                                      ? column.isSortedDesc
                                        ? <i className="ml-2 pt-1 fas fa-chevron-down"/>
                                        : <i className="ml-2 pt-1 fas fa-chevron-up"/>
                                      : null
                                  }
                                </div>
                              </div>
                              <div>{ column.canFilter ? column.render('Filter') : null }</div>
                            </div>
                        </th>
                      )
                  }
                </tr>
              )
            }
          </thead>
          <tbody { ...getTableBodyProps() }>
            { rows.map(row => {
                const { onClick } = row.original;
                prepareRow(row);
                return (
                  <tr {...row.getRowProps() }
                    className={ `
                      ${ props.striped ? theme.tableRowStriped : theme.tableRow }
                      ${ (onClick || onRowClick) ? "cursor-pointer" : "" }
                    ` }
                    onClick={ e => {
                      (typeof onRowClick === "function") && onRowClick(e, row);
                      (typeof onClick === "function") && onClick(e);
                    } }>
                      { row.cells.map((cell, i) =>
                          <td {...cell.getCellProps() }
                            className={ `${ theme.tableCell } ${ cell.column.className || "" }` }>
                            <div className="flex">
                              <div className="flex-0">{ cell.render('Cell') }</div>
                              { (i > 0) || (row.subRows.length === 0) ? null :
                                <div { ...row.getToggleRowExpandedProps() } className="flex-1 flex justify-end">
                                  { row.isExpanded ?
                                    <i className="ml-2 fas fa-chevron-down"/> :
                                    <i className="ml-2 fas fa-chevron-up"/>
                                  }
                                </div>
                              }
                            </div>
                          </td>
                        )
                      }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    )
}
