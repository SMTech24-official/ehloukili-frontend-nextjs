/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface TableProps<T> {
    columns: {
        header: string;
        accessor: keyof T;
        render?: (item: T) => React.ReactNode;
        width?: string;
        minWidth?: string;
    }[];
    data: T[];
    renderActions?: (item: T) => React.ReactNode;
}

export function Table<T extends object>({ columns, data, renderActions }: TableProps<T>) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Mobile Card View */}
            <div className="block lg:hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentData.map((item, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="space-y-3">
                                {columns.map((col) => (
                                    <div key={String(col.accessor)} className="flex justify-between items-start">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0 w-1/3">
                                            {col.header}:
                                        </dt>
                                        <dd className="text-sm text-gray-900 dark:text-gray-100 flex-1 text-right">
                                            <div className="break-words">
                                                {col.render ? col.render(item) : String(item[col.accessor] || '')}
                                            </div>
                                        </dd>
                                    </div>
                                ))}
                                {renderActions && (
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-600">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Actions:
                                        </dt>
                                        <dd className="flex space-x-2">
                                            {renderActions(item)}
                                        </dd>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {currentData.length === 0 && (
                    <div className="p-8 text-center">
                        <div className="text-gray-400 text-lg mb-2">No data found</div>
                        <div className="text-gray-500 text-sm">There are no records to display</div>
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block w-full">
                <div className="overflow-x-auto w-full">
                    <div className="inline-block min-w-full align-middle">
                        <div className="relative">
                            {/* className="w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700" */}
                            <table className="min-w-max w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        {columns.map((col, index) => (
                                            <th
                                                key={String(col.accessor)}
                                                className={`
                          px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider
                          ${index === 0
                                                        ? 'sticky left-0 z-10 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600'
                                                        : ''}
                        `}
                                                style={{
                                                    minWidth: col.minWidth || (index === 0 ? '200px' : '150px'),
                                                    width: col.width || 'auto'
                                                }}
                                            >
                                                {col.header}
                                            </th>
                                        ))}
                                        {renderActions && (
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider min-w-[120px]">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {currentData.map((item, rowIndex) => (
                                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            {columns.map((col, colIndex) => (
                                                <td
                                                    key={String(col.accessor)}
                                                    className={`
                            px-6 py-4 text-sm text-gray-900 dark:text-gray-100
                            ${colIndex === 0
                                                            ? 'sticky left-0 z-10 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 font-medium'
                                                            : ''}
                          `}
                                                    style={{
                                                        minWidth: col.minWidth || (colIndex === 0 ? '200px' : '150px'),
                                                        width: col.width || 'auto'
                                                    }}
                                                >
                                                    <div className="break-words">
                                                        {col.render ? col.render(item) : String(item[col.accessor] || '')}
                                                    </div>
                                                </td>
                                            ))}
                                            {renderActions && (
                                                <td className="px-6 py-4 text-right text-sm min-w-[120px]">
                                                    <div className="flex justify-end space-x-2">
                                                        {renderActions(item)}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {currentData.length === 0 && (
                                <div className="p-12 text-center">
                                    <div className="text-gray-400 text-lg mb-2">No data found</div>
                                    <div className="text-gray-500 text-sm">There are no records to display</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {data.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        {/* Items per page */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                Show
                            </label>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                {[10, 25, 50, 100].map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                            <span className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                entries
                            </span>
                        </div>

                        {/* Page info and navigation */}
                        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                            <div className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
                                <span className="font-medium">{data.length}</span> results
                            </div>

                            {totalPages > 1 && (
                                <div className="flex items-center justify-center space-x-1">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    {/* Page numbers */}
                                    <div className="flex items-center space-x-1">
                                        <div className="flex sm:hidden">
                                            {[...Array(Math.min(3, totalPages))].map((_, i) => {
                                                let page;
                                                if (totalPages <= 3) {
                                                    page = i + 1;
                                                } else if (currentPage === 1) {
                                                    page = i + 1;
                                                } else if (currentPage === totalPages) {
                                                    page = totalPages - 2 + i;
                                                } else {
                                                    page = currentPage - 1 + i;
                                                }

                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`w-8 h-8 text-sm rounded-lg border transition-colors ${currentPage === page
                                                            ? 'bg-primary-600 !text-white border-primary-600'
                                                            : 'bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="hidden sm:flex">
                                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                                let page;
                                                if (totalPages <= 5) {
                                                    page = i + 1;
                                                } else if (currentPage <= 3) {
                                                    page = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    page = totalPages - 4 + i;
                                                } else {
                                                    page = currentPage - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`w-8 h-8 text-sm rounded-lg border transition-colors ${currentPage === page
                                                            ? 'bg-primary-600 !text-white border-primary-600'
                                                            : 'bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
