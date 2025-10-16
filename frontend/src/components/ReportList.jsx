import { Link } from 'react-router-dom';

const ReportList = ({ reports, onDelete }) => {
    return (
        <div className="w-full">
            {reports.length > 0 ? (
                <ul className="space-y-3 sm:space-y-4">
                    {reports.map((report) => (
                        <li 
                            key={report._id} 
                            className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                {/* Report Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-base sm:text-lg text-gray-900 truncate">
                                                {report.basicDetails.name || 'N/A'}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs sm:text-sm font-medium text-gray-500">PAN:</span>
                                                <span className="text-xs sm:text-sm font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded">
                                                    {report.basicDetails.pan || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                    <Link 
                                        to={`/reports/${report._id}`} 
                                        className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200 text-center"
                                    >
                                        <span className="hidden sm:inline">View Report</span>
                                        <span className="sm:hidden">View</span>
                                    </Link>
                                    <button 
                                        onClick={() => onDelete(report._id)} 
                                        className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-12 sm:py-16 px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 font-medium mb-2">No reports found</p>
                    <p className="text-sm sm:text-base text-gray-500">Upload a file to get started with your first report</p>
                </div>
            )}
        </div>
    );
};

export default ReportList;