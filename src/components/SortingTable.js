import React, { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMNS } from './columns';
import './table.css';

const BasicTable = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [sorted, setSorted] = useState([]);

  const tableInstance = useReactTable({
    columns,
    data,
    state: { sorting: sorted },
    onSortingChange: setSorted,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((columnEl) => (
              <th key={columnEl.id} onClick={columnEl.column.getToggleSortingHandler()}>
                {/**
                 * Add onClick listener with columnEl.column.getToggleSortingHandler()
                 * Code for rendering the cell value
                 */}
                {flexRender(columnEl.column.columnDef.header, columnEl.getContext())}
                {/**
                 * Code for rendering the up and down sorting
                 * columnEl.column.getIsSorted() returns asc or desc if the column is sorted
                 * and using [] get the right value
                 */}
                {{ asc: ' - UP', desc: ' - DOWN' }[columnEl.column.getIsSorted() ?? null]}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
  );
};

export default BasicTable;
