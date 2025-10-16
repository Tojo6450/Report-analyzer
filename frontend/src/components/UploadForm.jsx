import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';

const UploadForm = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        reportId: null,
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'text/xml' && file.type !== 'application/xml') {
            alert('Only XML files are allowed.');
            event.target.value = null;
            setSelectedFile(null);
            return;
        }
        
        setSelectedFile(file);
        setError('');
    };
    
    const handleCancelFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleUpdate = async (reportId, fileToUpload) => {
        setIsLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('xmlfile', fileToUpload);

        try {
            const response = await axios.put(`http://localhost:5000/api/reports/${reportId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onUploadSuccess();
            navigate(`/reports/${response.data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update the report.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }

        setIsLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('xmlfile', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/api/reports/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onUploadSuccess();
            navigate(`/reports/${response.data._id}`);
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setModalState({
                    isOpen: true,
                    title: 'Duplicate Report Found',
                    message: `${err.response.data.message} Do you want to update it?`,
                    reportId: err.response.data.reportId,
                });
            } else {
                setError(err.response?.data?.message || 'An error occurred during upload.');
                setIsLoading(false);
            }
        }
    };

    const handleModalConfirm = () => {
        handleUpdate(modalState.reportId, selectedFile);
        setModalState({ isOpen: false });
    };

    const handleModalCancel = () => {
        setModalState({ isOpen: false });
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <ConfirmationModal
                isOpen={modalState.isOpen}
                title={modalState.title}
                message={modalState.message}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
            />
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <div className="relative group">
                        <input
                            type="file"
                            accept=".xml, text/xml"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id="file-upload"
                            ref={fileInputRef}
                        />
                        <label 
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 bg-gray-100 group-hover:shadow-lg cursor-pointer"
                        >
                            <div className="mb-4">
                                <div className="w-23 h-23 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-800">Click to browse</h3>
                                <p className="text-sm text-gray-500">Note: Select an XML file</p>
                            </div>
                        </label>
                    </div>

                    {selectedFile && (
                        <div className="mt-4 flex items-center justify-between w-full max-w-sm mx-auto gap-3 bg-white px-4 py-3 rounded-xl border border-green-200 shadow-sm animate-fade-in">
                            <div className="flex items-center gap-1 min-w-0">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(selectedFile.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={handleCancelFile} 
                                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors"
                                    aria-label="Cancel file selection"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isLoading || !selectedFile}
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center gap-3"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>Generate Report</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-6 animate-fade-in">
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl shadow-md">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-red-900 mb-1">Error</h4>
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.4s ease-out; }
            `}</style>
        </div>
    );
};

export default UploadForm;