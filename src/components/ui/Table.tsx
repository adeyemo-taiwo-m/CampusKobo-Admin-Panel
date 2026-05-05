import React from 'react';
import { cn } from '../../lib/utils';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> & {
  Header: React.FC<TableProps>;
  Body: React.FC<TableProps>;
  Row: React.FC<TableProps & { onClick?: () => void }>;
  Head: React.FC<TableProps>;
  Cell: React.FC<TableProps>;
} = ({ children, className }) => {
  return (
    <div className={cn('w-full overflow-auto rounded-lg border border-gray-200', className)}>
      <table className="w-full text-sm text-left">{children}</table>
    </div>
  );
};

Table.Header = ({ children, className }) => (
  <thead className={cn('bg-gray-50 border-b border-gray-200', className)}>{children}</thead>
);

Table.Body = ({ children, className }) => (
  <tbody className={cn('divide-y divide-gray-200 bg-white', className)}>{children}</tbody>
);

Table.Row = ({ children, className, onClick }) => (
  <tr 
    className={cn(
      'transition-colors hover:bg-gray-50/50', 
      onClick && 'cursor-pointer',
      className
    )}
    onClick={onClick}
  >
    {children}
  </tr>
);

Table.Head = ({ children, className }) => (
  <th className={cn('px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider', className)}>
    {children}
  </th>
);

Table.Cell = ({ children, className }) => (
  <td className={cn('px-4 py-3 text-gray-700', className)}>{children}</td>
);

export default Table;
