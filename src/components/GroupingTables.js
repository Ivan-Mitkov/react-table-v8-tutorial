import React, { useMemo } from 'react';
import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMNS } from './columns';
import './table.css';

const GroupingTables = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const [grouping, setGrouping] = React.useState([]);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });

  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th key={column.id} colSpan={column.colSpan}>
                {column.isPlaceholder ? null : (
                  <div>
                    {column.column.getCanGroup() ? (
                      // If the header can be grouped, let's add a toggle
                      <button
                        {...{
                          onClick: column.column.getToggleGroupingHandler(),
                          style: {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        {column.column.getIsGrouped()
                          ? `🛑(${column.column.getGroupedIndex()}) `
                          : `👊 `}
                      </button>
                    ) : null}{' '}
                    {flexRender(column.column.columnDef.header, column.getContext())}
                  </div>
                )}
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
          <tr>
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

export default GroupingTables;
