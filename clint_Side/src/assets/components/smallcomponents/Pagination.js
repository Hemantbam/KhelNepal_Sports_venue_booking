import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example" className="flex justify-center py-4 bg-gray-200">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-orange-600 bg-gray-200 border border-e-0 border-orange-600 rounded-l-lg hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === number ? 'bg-orange-600 text-white border border-orange-600 hover:bg-orange-700 hover:text-white dark:bg-orange-600 dark:border-orange-600 dark:text-white dark:hover:bg-orange-700 dark:hover:text-white' : 'text-orange-600 bg-gray-200 border border-orange-600 hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-orange-600 bg-gray-200 border border-orange-600 rounded-r-lg hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
