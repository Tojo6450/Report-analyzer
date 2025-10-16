import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadForm from '../components/UploadForm';
import ReportList from '../components/ReportList';
import ConfirmationModal from '../components/ConfirmationModal';

const HomePage = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');
    
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        reportId: null,
    });

    const fetchReports = async () => {
        try {
            setError('');
            const { data } = await axios.get('http://localhost:5000/api/reports');
            setReports(data);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Could not fetch existing reports. Please ensure the backend is running.');
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleDeleteClick = (reportId) => {
        setDeleteModal({
            isOpen: true,
            reportId: reportId,
        });
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/reports/${deleteModal.reportId}`);
            fetchReports();
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to delete the report.');
        } finally {
            setDeleteModal({ isOpen: false, reportId: null });
        }
    };

    const cancelDelete = () => {
        setDeleteModal({ isOpen: false, reportId: null });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <ConfirmationModal
                    isOpen={deleteModal.isOpen}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this report? This action cannot be undone."
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
                
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-3">
                        Report Management
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
                        Upload, manage, and organize your reports efficiently
                    </p>
                </div>

                <div className="space-y-8 sm:space-y-12">
                    <section className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 lg:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                                Upload New Report
                            </h2>
                        </div>
                        <UploadForm onUploadSuccess={fetchReports} />
                    </section>
                    
                    {error && (
                        <div className="animate-pulse">
                            <div className="p-4 sm:p-5 bg-red-50 text-red-700 border-l-4 border-red-500 rounded-lg shadow-md">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm sm:text-base font-medium">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <section className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 lg:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                                Previously Generated Reports
                            </h2>
                        </div>
                        <ReportList reports={reports} onDelete={handleDeleteClick} />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HomePage;