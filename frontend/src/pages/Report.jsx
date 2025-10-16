import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import BasicDetails from '../components/BasicDetails';
import ReportSummary from '../components/ReportSummary';
import CreditAccountsTable from '../components/CreditAccountTable';

const ReportPage = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/reports/${id}`);
                setReport(data);
            } catch (err) {
                setError('Failed to fetch report. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
                    <p className="text-lg sm:text-xl font-semibold text-gray-700">Loading report...</p>
                    <p className="text-sm sm:text-base text-gray-500 mt-2">Please wait while we fetch your data</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full mb-4">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-red-600 mb-2">Error Loading Report</p>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
                    <Link 
                        to="/" 
                        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No Report Found</p>
                    <p className="text-sm sm:text-base text-gray-500 mb-6">The report you're looking for doesn't exist</p>
                    <Link 
                        to="/" 
                        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8 lg:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
                                Report Details
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600">
                                Comprehensive credit report analysis
                            </p>
                        </div>
                        <Link 
                            to="/" 
                            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="hidden sm:inline">Back to Home</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300">
                        <BasicDetails data={report.basicDetails} />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300">
                        <ReportSummary data={report.reportSummary} />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300">
                        <CreditAccountsTable data={report.creditAccounts} />
                    </div>
                </div>

                <div className="text-center mt-8 sm:mt-10 lg:mt-12">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-base sm:text-lg font-semibold rounded-xl hover:from-gray-800 hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Process Another Report
                    </Link>
                </div>
            </div>
        </div>
        
    );
};

export default ReportPage;