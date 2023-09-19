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
    Cell: ({ value }) => {
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
    footer: 'Name',
    columns: [
      { header: 'First Name', footer: 'First Name', accessorKey: 'first_name' },
      { header: 'Last Name', footer: 'Last Name', accessorKey: 'last_name' },
    ],
  },
  {
    header: 'Info',
    footer: 'Info',
    columns: [
      { header: 'Date of Birth', footer: 'Date of Birth', accessorKey: 'date_of_birth' },
      { header: 'Country', footer: 'Country', accessorKey: 'country' },
      { header: 'Phone Number', footer: 'Phone Number', accessorKey: 'phone' },
    ],
  },
];
