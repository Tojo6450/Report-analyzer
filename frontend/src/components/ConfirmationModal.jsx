const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onCancel}
            />
            
            {/* Modal content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200">
                {/* Content padding */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {title}
                    </h3>
                    
                    {/* Message */}
                    <p className="text-gray-600 leading-relaxed">
                        {message}
                    </p>
                </div>
                
                {/* Action buttons */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-150 shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;