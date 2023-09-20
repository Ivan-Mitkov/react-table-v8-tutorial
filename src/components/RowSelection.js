import React, { useMemo } from 'react';
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { RankingInfo, rankItem, compareItems } from '@tanstack/match-sorter-utils';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS_WITH_CHECKBOX } from './columns';
import Pagination from './Pagination';
import Filter from './Filter';
import './table.css';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const RowSelection = () => {
  const columns = useMemo(() => COLUMNS_WITH_CHECKBOX, []);
  const data = useMemo(() => MOCK_DATA, []);

  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState([]);

  const tableInstance = useReactTable({
    columns,
    data,
    // bind table state to component state
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection: true, //enable row selection for all rows
    enableMultiRowSelection: true,
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;

  return (
    <div>
      <div>
        <input
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
        />
      </div>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th key={column.id}>
                  {flexRender(column.column.columnDef.header, column.getContext())}
                  {column.column.getCanFilter() ? (
                    <div>
                      <Filter column={column.column} table={tableInstance} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => console.log('ROW DATA', row?.original)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} onClick={() => console.log('CELL DATA', cell.getValue())}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((column) => (
                <td key={column.id}>
                  {flexRender(column.column.columnDef.footer, column.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <Pagination table={tableInstance} />
      <div>
        {Object.keys(rowSelection).length} of {tableInstance.getPreFilteredRowModel().rows.length}{' '}
        Total Rows Selected
        {tableInstance.getSelectedRowModel().flatRows.map((row) => (
          <div>{JSON.stringify(row.original)}</div>
        ))}
      </div>
    </div>
  );
};

export default RowSelection;
