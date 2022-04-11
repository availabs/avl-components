import Table from "./index";

const TableDocs = {
    name: "Table",
    themeVar: "table",
    description: "A responsive vertical navigation component.",
    props: [

        {
            name: "columns",
            type: "data",
            default: [],
        },
        {
            name: "data",
            type: "data",
            default: []
        },
        {
            name: "disableFilters",
            type: "boolean",
            default: false
        },
        {
            name: "disableSortBy",
            type: "boolean",
            default: false
        },
    ],
    dependencies: [
        // {
        //     name: "Nav Item",
        //     theme: ["navitemSide", "navitemSideActive"],
        // },
    ],
    examples: [
        {
            title: 'Simple Table',
            Component: (props) => (
                <div className="h-full w-full bg-gray-100">
                    <Table {...props} />
                </div>
            ),
            props: [
                {
                    name: "data",
                    default: [
                        {col1: 'data for col1 row1', col2: 'data for col2 row1', col3: 'data for col3 row1'},
                        {col1: 'data for col1 row2', col2: 'data for col2 row2', col3: 'data for col3 row2'}
                    ],
                },
                {
                    name: "columns",
                    default: [
                        {Header: 'col1', accessor: 'col1'}, {Header: 'col2', accessor: 'col2'}, {Header: 'col3', accessor: 'col3'},
                    ],
                },
                {
                    name: 'disableFilters',
                    default: true
                },
                {
                    name: 'disableSortBy',
                    default: true
                },
                {
                    name: 'themeOptions',
                    default: {
                        color: 'white',
                        size: 'compact'
                    }
                },
            ],

        },
        {
            title: 'Filters',
            Component: (props) => (
                <div className="h-full w-full bg-gray-100">
                    <Table {...props} />
                </div>
            ),
            props: [
                {
                    name: "data",
                    default: [
                        {col1: 'data for col1 row1', col2: 'data for col2 row1', col3: 'data for col3 row1'},
                        {col1: 'data for col1 row2', col2: 'data for col2 row2', col3: 'data for col3 row2'}
                    ],
                },
                {
                    name: "columns",
                    default: [
                        {Header: 'col1', accessor: 'col1'}, {Header: 'col2', accessor: 'col2'}, {Header: 'col3', accessor: 'col3'},
                    ],
                },
                {
                    name: 'disableFilters',
                    default: false
                },
                {
                    name: 'disableSortBy',
                    default: true
                },
                {
                    name: 'themeOptions',
                    default: {
                        color: 'white',
                        size: 'compact'
                    }
                },
            ],

        },
        {
            title: 'Column specific filters',
            Component: (props) => (
                <div className="h-full w-full bg-gray-100">
                    <Table {...props} />
                </div>
            ),
            props: [
                {
                    name: "data",
                    default: [
                        {col1: 'data for col1 row1', col2: 'data for col2 row1', col3: 'data for col3 row1'},
                        {col1: 'data for col1 row2', col2: 'data for col2 row2', col3: 'data for col3 row2'}
                    ],
                },
                {
                    name: "columns",
                    default: [
                        {Header: 'col1', accessor: 'col1'}, {Header: 'col2', accessor: 'col2', disableFilters: true}, {Header: 'col3', accessor: 'col3'},
                    ],
                },
                {
                    name: 'disableSortBy',
                    default: true
                },
                {
                    name: 'themeOptions',
                    default: {
                        color: 'white',
                        size: 'compact'
                    }
                },
            ],

        },


        {
            title: 'Sortable columns',
            Component: (props) => (
                <div className="h-full w-full bg-gray-100">
                    <Table {...props} />
                </div>
            ),
            props: [
                {
                    name: "data",
                    default: [
                        {col1: 'data for col1 row1', col2: 'data for col2 row1', col3: 'data for col3 row1'},
                        {col1: 'data for col1 row2', col2: 'data for col2 row2', col3: 'data for col3 row2'}
                    ],
                },
                {
                    name: "columns",
                    default: [
                        {Header: 'col1', accessor: 'col1'}, {Header: 'col2', accessor: 'col2'}, {Header: 'col3', accessor: 'col3'},
                    ],
                },
                {
                    name: 'disableFilters',
                    default: true
                },
                {
                    name: 'disableSortBy',
                    default: false
                },
                {
                    name: 'themeOptions',
                    default: {
                        color: 'white',
                        size: 'compact'
                    }
                },
            ],

        },
        {
            title: 'Column specific sort',
            Component: (props) => (
                <div className="h-full w-full bg-gray-100">
                    <Table {...props} />
                </div>
            ),
            props: [
                {
                    name: "data",
                    default: [
                        {col1: 'data for col1 row1', col2: 'data for col2 row1', col3: 'data for col3 row1'},
                        {col1: 'data for col1 row2', col2: 'data for col2 row2', col3: 'data for col3 row2'}
                    ],
                },
                {
                    name: "columns",
                    default: [
                        {Header: 'col1', accessor: 'col1'}, {Header: 'col2', accessor: 'col2', disableSortBy: true}, {Header: 'col3', accessor: 'col3'},
                    ],
                },
                {
                    name: 'disableFilters',
                    default: true
                },
                {
                    name: 'themeOptions',
                    default: {
                        color: 'white',
                        size: 'compact'
                    }
                },
            ],

        },
    ],
};

export default TableDocs;
