import React, { useMemo } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';

const ColumnHiding = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const tableInstance = useReactTable({
    columns,
    data,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const {
    getIsAllColumnsVisible,
    getToggleAllColumnsVisibilityHandler,
    getAllLeafColumns,
    getHeaderGroups,
  } = tableInstance;

  return (
    <>
      <div>
        <div>
          <div>
            <label>
              <input
                {...{
                  type: 'checkbox',
                  checked: getIsAllColumnsVisible(),
                  onChange: getToggleAllColumnsVisibilityHandler(),
                }}
              />{' '}
              Toggle All
            </label>
          </div>
          {getAllLeafColumns().map((column) => {
            return (
              <div key={column.id} className="px-1">
                <label>
                  <input
                    {...{
                      type: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{' '}
                  {column.id}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} colSpan={headerGroup.colSpan}>
              {headerGroup.headers.map((column) => (
                <th key={column.id}>
                  {flexRender(column.column.columnDef.header, column.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {tableInstance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default ColumnHiding;
