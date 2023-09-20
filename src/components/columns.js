import { format } from 'date-fns';
// import ColumnFilter from './ColumnFilter';
import { sortingFns } from '@tanstack/react-table';
import { compareItems } from '@tanstack/match-sorter-utils';
import Checkbox from './Checkbox';

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const COLUMNS = [
  {
    header: 'Id',
    footer: 'Id',
    accessorKey: 'id',
    // Filter: ColumnFilter,
    enableFilter: false,
    sticky: 'left',
  },
  {
    header: 'First Name',
    footer: 'First Name',
    accessorKey: 'first_name',
    // Filter: ColumnFilter,
    sticky: 'left',
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: 'Last Name',
    footer: 'Last Name',
    accessorKey: 'last_name',
    // Filter: ColumnFilter,
    sticky: 'left',
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: 'Email',
    footer: 'Email',
    accessorKey: 'email',
    // Filter: ColumnFilter,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: 'Date of Birth',
    footer: 'Date of Birth',
    accessorFn: (row) => {
      return format(new Date(row['date_of_birth']), 'dd/MM/yyyy');
    },
    // Filter: ColumnFilter,
  },
  {
    header: 'Age',
    footer: 'Age',
    accessorKey: 'age',
    // Filter: ColumnFilter,
  },
  {
    header: 'Country',
    footer: 'Country',
    accessorKey: 'country',
    // Filter: ColumnFilter,
  },
  {
    header: 'Phone Number',
    footer: 'Phone Number',
    accessorKey: 'phone',
    //    Filter: ColumnFilter
    sticky: 'right',
  },
];
export const COLUMNS_WITH_CHECKBOX = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      );
    },
    cell: ({ row }) => (
      <div className="px-1">
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    header: 'Id',
    footer: 'Id',
    accessorKey: 'id',
    // Filter: ColumnFilter,
    enableFilter: false,
    sticky: 'left',
  },
  {
    header: 'First Name',
    footer: 'First Name',
    accessorKey: 'first_name',
    // Filter: ColumnFilter,
    sticky: 'left',
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: 'Last Name',
    footer: 'Last Name',
    accessorKey: 'last_name',
    // Filter: ColumnFilter,
    sticky: 'left',
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: 'Email',
    footer: 'Email',
    accessorKey: 'email',
    // Filter: ColumnFilter,
    filterFn: 'fuzzy',
    sortingFn: fuzzySort,
  },
  {
    header: 'Date of Birth',
    footer: 'Date of Birth',
    accessorFn: (row) => {
      return format(new Date(row['date_of_birth']), 'dd/MM/yyyy');
    },
    // Filter: ColumnFilter,
  },
  {
    header: 'Age',
    footer: 'Age',
    accessorKey: 'age',
    // Filter: ColumnFilter,
  },
  {
    header: 'Country',
    footer: 'Country',
    accessorKey: 'country',
    // Filter: ColumnFilter,
  },
  {
    header: 'Phone Number',
    footer: 'Phone Number',
    accessorKey: 'phone',
    //    Filter: ColumnFilter
    sticky: 'right',
  },
];

export const GROUPED_COLUMNS = [
  {
    header: 'Id',
    footer: 'Id',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    columns: [
      {
        id: 'first_name',
        accessorFn: (row) => row['first_name'],

        // cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
        footer: () => <span>First Name</span>,

        /**
         * override the value used for row grouping
         * (otherwise, defaults to the value derived from accessorKey / accessorFn)
         */
        getGroupingValue: (row) => {
          return `${row['first_name']} \\\\ ${row['last_name']}`;
        },
      },
      {
        accessorFn: (row) => row['last_name'],
        id: 'last_Name',
        header: () => <span>Last Name</span>,
        footer: () => <span>Last Name</span>,
        // cell: (info) => info.getValue(),
      },
    ],
  },
  {
    header: 'Info',
    columns: [
      {
        id: 'date_of_birth',
        header: 'Date of Birth',
        footer: 'Date of Birth',
        accessorFn: (row) => {
          return format(new Date(row['date_of_birth']), 'dd/MM/yyyy');
        },
      },
      { header: 'Country', footer: 'Country', accessorKey: 'country' },
      { header: 'Phone Number', footer: 'Phone Number', accessorKey: 'phone' },
    ],
  },
];
