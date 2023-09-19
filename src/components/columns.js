import { format } from 'date-fns';
// import ColumnFilter from './ColumnFilter';

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
  },
  {
    header: 'Last Name',
    footer: 'Last Name',
    accessorKey: 'last_name',
    // Filter: ColumnFilter,
    sticky: 'left',
  },
  {
    header: 'Email',
    footer: 'Email',
    accessorKey: 'email',
    // Filter: ColumnFilter,
  },
  {
    header: 'Date of Birth',
    footer: 'Date of Birth',
    accessorKey: 'date_of_birth',
    cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy');
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
