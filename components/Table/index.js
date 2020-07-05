import React from 'react'
import {
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
  useExpanded
} from 'react-table'

import matchSorter from 'match-sorter'

import { useTheme } from "../../wrappers/with-theme"

const DefaultColumnFilter = ({ column }) => {
  const {
      filterValue = "",
      // preFilteredRows,
      setFilter
    } = column;
    // count = preFilteredRows.length;
  return (
    <input className="px-2 rounded" onClick= { e => e.stopPropagation() }
      value={ filterValue } onChange={ e => setFilter(e.target.value) }
      placeholder={ `Search...` }/>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = val => !val;

const getPageSpread = (page, maxPage) => {
	let low = page - 2,
		high = page + 2;

	if (low < 0) {
		high += -low;
		low = 0;
	}
	if (high > maxPage) {
		low -= (high - maxPage);
		high = maxPage;
	}
  const spread = [];
  for (let i = Math.max(0, low); i <= Math.min(maxPage, high); ++i) {
    spread.push(i);
  }
  return spread;
}

export default ({ columns, sortBy, sortOrder, initialPageSize, data, onRowClick, ...props }) => {
    const theme = useTheme();
    const filterTypes = React.useMemo(
      () => ({
        fuzzyText: fuzzyTextFilterFn
      }), []
    );

    const defaultColumn = React.useMemo(
      () => ({ Filter: DefaultColumnFilter }), []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      rows,
      preFilteredRows,
      prepareRow,
      canPreviousPage,
      canNextPage,
      gotoPage,
      previousPage,
      nextPage,
      pageCount,
      state: {
        pageSize,
        pageIndex
      }
    } = useTable(
      { columns,
        data,
        defaultColumn,
        filterTypes,
        initialState: {
          pageSize: initialPageSize,
          sortBy: [{ id: sortBy, desc: sortOrder === "desc" }]
        }
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      useExpanded,
      usePagination
    );
    if (!preFilteredRows.length) return null;

    return (
        <table { ...getTableProps() } className="w-full">
          <thead>
            { headerGroups.map(headerGroup =>
                <tr { ...headerGroup.getHeaderGroupProps() }>
                  { headerGroup.headers
                      .map(column =>
                        <th { ...column.getHeaderProps(column.getSortByToggleProps()) }
                          className={ theme.tableHeader }>
                            <div>
                              <div className="flex">
                                <div className="flex-0">{ column.render("Header") }</div>
                                { !column.isSorted ? null :
                                  <div className="flex-1 flex justify-end mr-8">
                                    { column.isSortedDesc ?
                                        <i className="ml-2 pt-1 fas fa-chevron-down"/> :
                                        <i className="ml-2 pt-1 fas fa-chevron-up"/>
                                    }
                                  </div>
                                }
                              </div>
                              { !column.canFilter ? null :
                                <div>{ column.render('Filter') }</div>
                              }
                            </div>
                        </th>
                      )
                  }
                </tr>
              )
            }
            { pageCount <= 1 ? null :
              <tr className="px-2">
                <td colSpan={ columns.length }>
                  <div className={ `flex items-center ${ theme.textInfo }` }>
                    <div className="flex-0">
                      <span>
                        Page { pageIndex + 1 } of { pageCount }&nbsp;|&nbsp;
                        Rows { pageIndex * pageSize + 1 }-
                        { Math.min(rows.length, pageIndex * pageSize + pageSize) } of { rows.length }
                      </span>
                    </div>
                    <div className={ `flex-1 flex justify-end items-center` }>
                      <ToolbarButton disabled={ pageIndex === 0 }
                        onClick={ e => gotoPage(0) }>
                        {"<<"}
                      </ToolbarButton>
                      <ToolbarButton disabled={ !canPreviousPage }
                        onClick={ e => previousPage() }>
                        {"<"}
                      </ToolbarButton>
                      { getPageSpread(pageIndex, pageCount - 1)
                          .map(p => {
                            const active = (p === pageIndex);
                            return (
                              <ToolbarButton key={ p } active={ active }
                                onClick={ active ? null : e => gotoPage(p) }>
                                { p + 1 }
                              </ToolbarButton>
                            )
                          })
                      }
                      <ToolbarButton disabled={ !canNextPage }
                        onClick={ e => nextPage(0) }>
                        {">"}
                      </ToolbarButton>
                      <ToolbarButton disabled={ pageIndex === (pageCount - 1) }
                        onClick={ e => gotoPage(pageCount - 1) }>
                        {">>"}
                      </ToolbarButton>
                    </div>
                  </div>
                </td>
              </tr>
            }
          </thead>
          <tbody { ...getTableBodyProps() }>
            { page.map(row => {
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

const ToolbarButton = ({ disabled, active, className, onClick, ...props }) => {
  const theme = useTheme();
  return (
    <span className={ `
      ${ disabled ? "cursor-not-allowed" : active ? "cursor-default" : "cursor-pointer" }
      ${ disabled ? "font-normal" :  active ? "font-bold" : "hover:font-extrabold" }
      ${ active === false ? "text-base" : "text-xl" }
      ${ disabled ? "opacity-50" : "opacity-100" }
      ${ className } ${ theme.transition } ml-2
    ` } { ...props } onClick={ (disabled || active) ? null : (e => onClick(e)) }/>
  )
}
