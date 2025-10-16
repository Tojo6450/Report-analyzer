const DetailItem = ({ label, value, icon, iconBg }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        {/* Top row for icon and label */}
        <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {icon}
            </div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {label}
            </p>
        </div>
        {/* Value is now on its own line, centered, and will break if too long */}
        <p className="text-lg font-bold text-gray-900 text-center break-all pt-2">
            {value || 'N/A'}
        </p>
    </div>
);

const BasicDetails = ({ data }) => {
    if (!data) return null;

    return (
        <section className="w-full">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Basic Details
                </h2>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Name */}
                <DetailItem 
                    label="Name" 
                    value={data.name}
                    icon={
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    }
                    iconBg="bg-blue-100"
                />

                {/* Mobile Phone */}
                <DetailItem 
                    label="Mobile Phone" 
                    value={data.mobilePhone}
                    icon={
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    }
                    iconBg="bg-green-100"
                />

                {/* PAN */}
                <DetailItem 
                    label="PAN" 
                    value={data.pan}
                    icon={
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                    }
                    iconBg="bg-purple-100"
                />

                {/* Credit Score - Special Card */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-white uppercase tracking-wide">
                            Credit Score
                        </p>
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white">
                        {data.creditScore || 'N/A'}
                    </p>
                    <div className="mt-3">
                        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${Math.min((data.creditScore / 900) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BasicDetails;