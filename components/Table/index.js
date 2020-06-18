import React from 'react'
import {useFilters, useGlobalFilter, useSortBy, useTable} from 'react-table'
// import {CSVLink, CSVDownload} from 'react-csv';
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'
import {Link} from "react-router-dom";
// import _ from 'lodash'
// import MultiSelectFilter from "../../filters/multi-select-filter";
import { useTheme } from "../../wrappers/with-theme"


// Define a default UI for filtering
function DefaultColumnFilter({
                                 column: {filterValue, preFilteredRows, setFilter},
                             }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;

function renderCell(cell) {
    console.log('render cell', cell)
    return (
        cell.column.link ?
            <Link
                to={typeof cell.column.link === 'boolean' ? cell.row.original.link : cell.column.link(cell.row.original.link)}>
                {
                    cell.column.formatValue ?
                        cell.column.formatValue(cell.value) :
                        cell.render('Cell')
                }
            </Link> :
            cell.column.formatValue ?
                cell.column.formatValue(cell.value) :
                cell.render('Cell')
    )
}

function Table({columns, data, height, tableClass, actions, csvDownload,...props}) {
    const theme = useTheme();
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
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
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy,
    );
    if (!rows) return null;
    //let downloadData;
    // if (csvDownload.length){
    //     downloadData = [...rows.map(r => r.original)]
    //     downloadData = downloadData.map(row => {
    //         let tmpRow = {}
    //         Object.keys(row)
    //             .filter(f => !['edit', 'view', 'delete'].includes(f))
    //             .forEach(key => {
    //                 if (csvDownload.includes(key)){
    //                     tmpRow[key] = row[key]
    //                 }
    //             // if (!csvDownload.includes(key)) delete row[key]
    //         })
    //         return tmpRow
    //     })
    // }

    return (
        <div class="flex flex-col">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class={`align-middle inline-block min-w-full ${theme.shadow} overflow-hidden sm:rounded-lg border-b border-gray-200`}>
                <table {...getTableProps()} class="min-w-full">
                    <thead>
                    {headerGroups.map((headerGroup,i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key ={i}>
                            {headerGroup.headers
                                .filter(cell => cell.expandable !== 'true')
                                .map((column,j) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th key ={j}  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    {
                                        column.sort ?
                                            (
                                                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                    {column.render('Header')}
                                                    {/* Add a sort direction indicator */}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? <i className="os-icon os-icon-arrow-up6"></i>
                                                                : <i className="os-icon os-icon-arrow-down6"></i>
                                                            : ''}
                                                    </span>
                                                </div>
                                            ) : column.render('Header')

                                    }
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter && column.filter ?
                                        column.filter === 'multi' ?
                                            /* add multi select back */
                                            column.render('Filter') : column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                
                                <tr {...row.getRowProps()}
                                    className={`${props.striped ? theme.tableRowStriped : theme.tableRow}`}
                                    onClick={(e) => {
                                        if (document.getElementById(`expandable${i}`)){
                                            document.getElementById(`expandable${i}`).style.display =
                                            document.getElementById(`expandable${i}`).style.display === 'none' ? 'table-row' : 'none'
                                        }
                                    }}
                                >
                                    {row.cells
                                        .filter(cell => cell.column.expandable !== 'true')
                                        .map(cell => {
                                        // if (cell.column.Header.includes('.')){
                                        //     cell.value = cell.row.original[cell.column.Header]
                                        // }
                                        return (
                                            <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900' {...cell.getCellProps()}>
                                                {renderCell(cell)}
                                            </td>
                                        )
                                    })}
                                    { /*actions ?
                                        Object.keys(actions)
                                            .map((action,i) => {
                                                    return (
                                                        <td key={i}>
                                                            {
                                                                typeof row.original[action] === 'string' ?
                                                                    <Link
                                                                        className={action === 'delete' ?
                                                                            'btn btn-sm btn-outline-danger' :
                                                                            "btn btn-sm btn-outline-primary"}
                                                                        style={{textTransform: 'capitalize'}}
                                                                        to={row.original[action]}>
                                                                        {action}
                                                                    </Link>
                                                                    :
                                                                    row.original[action]
                                                            }
                                                        </td>)
                                                }
                                            )
                                        : null */}
                                </tr>
                                
                            )
                        }
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Table