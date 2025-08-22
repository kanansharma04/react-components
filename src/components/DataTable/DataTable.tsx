import React, { useState } from 'react';
import type { DataTableProps, Column } from './types';

// Sample data and columns for demonstration
const defaultData = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 22 },
  { name: 'Diana', age: 28 },
  { name: 'Eve', age: 35 },
  { name: 'Frank', age: 27 },
];
const defaultColumns: Column<any>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  // Use default data/columns if not provided or empty
  const tableData: T[] = data && data.length > 0 ? data : (defaultData as unknown as T[]);
  const tableColumns: Column<T>[] = columns && columns.length > 0 ? columns : (defaultColumns as Column<T>[]);

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortKey) return tableData;
    return [...tableData].sort((a, b) => {
      const aValue = a[sortKey as keyof T];
      const bValue = b[sortKey as keyof T];
      if (aValue < bValue) return sortAsc ? -1 : 1;
      if (aValue > bValue) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [tableData, sortKey, sortAsc]);

  // Selection logic
  const handleRowSelect = (rowIdx: number) => {
    let newSelected: number[];
    if (selectable === 'multiple') {
      newSelected = selectedRows.includes(rowIdx)
        ? selectedRows.filter(idx => idx !== rowIdx)
        : [...selectedRows, rowIdx];
    } else {
      newSelected = selectedRows[0] === rowIdx ? [] : [rowIdx];
    }
    setSelectedRows(newSelected);
    if (onRowSelect) {
      onRowSelect(newSelected.map(idx => sortedData[idx]));
    }
  };

  // Empty state
  const isEmpty = !loading && sortedData.length === 0;

  return (
    <div className="overflow-x-auto mb-6 w-full max-w-2xl mx-auto relative">
      {/* Dark theme animated background */}
      <div className="hidden dark:block absolute inset-0 z-0 rounded-2xl pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 rounded-2xl animate-dark-bg"></div>
      </div>
      <div className="relative z-10">
        {loading ? (
          <div className="text-center py-6 text-blue-500 animate-pulse">Loading...</div>
        ) : isEmpty ? (
          <div className="text-center py-6 text-gray-400">No data available.</div>
        ) : (
         <table
  className="min-w-full 
             border border-blue-200 dark:border-gray-800 
             rounded-3xl overflow-hidden 
             bg-white dark:bg-black 
             shadow-[0_8px_24px_rgba(0,0,0,0.15),0_12px_48px_rgba(59,130,246,0.25)] 
             dark:shadow-[0_8px_24px_rgba(0,0,0,0.6),0_12px_48px_rgba(255,255,255,0.1)] 
             transition-all duration-500 ease-in-out 
             backdrop-blur-xl 
             hover:shadow-[0_12px_36px_rgba(0,0,0,0.25),0_16px_56px_rgba(59,130,246,0.35)] 
             dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.7),0_16px_56px_rgba(255,255,255,0.2)]"
>
  <thead>
              <tr className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-500">
                {selectable && (
                  <th className="px-4 py-3 border-b border-blue-200 dark:border-gray-700"></th>
                )}
                {tableColumns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left font-extrabold text-blue-700 dark:text-blue-300 border-b border-blue-200 dark:border-gray-700 cursor-pointer select-none transition-colors duration-300 drop-shadow-lg"
                    onClick={() => {
                      if (col.sortable) {
                        if (sortKey === col.dataIndex) {
                          setSortAsc(!sortAsc);
                        } else {
                          setSortKey(col.dataIndex as string);
                          setSortAsc(true);
                        }
                      }
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {col.title}
                      {col.sortable && (
                        <span className="text-xs transition-transform duration-300">
                          {sortKey === col.dataIndex ? (
                            <span className="inline-block scale-125 text-blue-500 dark:text-blue-300 drop-shadow-md">{sortAsc ? '▲' : '▼'}</span>
                          ) : ''}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`group hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors duration-300 animate-table-row ${
                    selectable && selectedRows.includes(rowIndex)
                      ? 'bg-blue-200 dark:bg-gray-700'
                      : ''
                  }`}
                  onClick={() => selectable && handleRowSelect(rowIndex)}
                  style={{ cursor: selectable ? 'pointer' : 'default', boxShadow: selectable && selectedRows.includes(rowIndex) ? '0 4px 24px 0 rgba(59,130,246,0.15)' : undefined }}
                >
                  {selectable && (
                    <td className="px-4 py-2 border-b border-blue-100 dark:border-gray-700">
                      <input
                        type={selectable === 'multiple' ? 'checkbox' : 'radio'}
                        checked={selectedRows.includes(rowIndex)}
                        readOnly
                        className="accent-blue-500 dark:accent-blue-300 scale-125"
                      />
                    </td>
                  )}
                  {tableColumns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-2 border-b border-blue-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300 font-medium group-hover:scale-[1.03] group-hover:shadow-lg"
                      style={{
                        background: selectedRows.includes(rowIndex)
                          ? 'linear-gradient(90deg, #e0e7ff 0%, #f3f4f6 100%)'
                          : undefined,
                        borderRadius: '0.5rem'
                      }}
                    >
                      {row[col.dataIndex] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style>
        {`
          .animate-table-row {
            animation: fadeInTableRow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeInTableRow {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-dark-bg {
            animation: darkBgMove 4s linear infinite alternate;
          }
          @keyframes darkBgMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default DataTable;


