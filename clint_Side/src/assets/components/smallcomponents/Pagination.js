import React from 'react';

const Pagination = () => {
    return (
        <nav aria-label="Page navigation example" className="flex justify-center py-4 bg-gray-200">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-orange-600 bg-gray-200 border border-e-0 border-orange-600 rounded-l-lg hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-orange-600 bg-gray-200 border border-orange-600 hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-orange-600 bg-gray-200 border border-orange-600 hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-4 h-10 leading-tight  bg-orange-600 border border-orange-600 hover:bg-orange-700 hover:text-white dark:border-orange-600 dark:bg-orange-600 text-white">3</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-orange-600 bg-gray-200 border border-orange-600 hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white">4</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-orange-600 bg-gray-200 border border-orange-600 hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white">5</a>
                </li>
                <li>
                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-orange-600 bg-gray-200 border border-orange-600 rounded-r-lg hover:bg-gray-300 dark:bg-gray-200 dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
