const SummaryCard = ({ title, value, icon, iconBg }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-start gap-4">
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {icon}
        </div>

        <div className="flex-1">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {title}
            </p>
            <p className="text-xl font-bold text-gray-900">
                {value}
            </p>
        </div>
    </div>
);

const ReportSummary = ({ data }) => {
    if (!data) return null;

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return 'N/A';
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <section className="w-full">

            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Report Summary
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <SummaryCard 
                    title="Total Accounts" 
                    value={data.totalAccounts} 
                    icon={<svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
                    iconBg="bg-indigo-100"
                />
                <SummaryCard 
                    title="Active Accounts" 
                    value={data.activeAccounts}
                    icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                    iconBg="bg-green-100"
                />
                <SummaryCard 
                    title="Closed Accounts" 
                    value={data.closedAccounts}
                    icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                    iconBg="bg-red-100"
                />
                <SummaryCard 
                    title="Total Current Balance" 
                    value={formatCurrency(data.currentBalanceAmount)}
                    icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
                    iconBg="bg-blue-100"
                />
                <SummaryCard 
                    title="Secured Balance" 
                    value={formatCurrency(data.securedAmount)}
                    icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>}
                    iconBg="bg-yellow-100"
                />
                <SummaryCard 
                    title="Unsecured Balance" 
                    value={formatCurrency(data.unsecuredAmount)}
                    icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>}
                    iconBg="bg-orange-100"
                />
                <SummaryCard 
                    title="Enquiries (Last 7 Days)" 
                    value={data.enquiriesLast7Days}
                    icon={<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
                    iconBg="bg-gray-200"
                />
            </div>
        </section>
    );
};

export default ReportSummary;