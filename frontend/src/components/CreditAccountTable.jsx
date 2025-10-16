const CreditAccountsTable = ({ data }) => {
    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return 'N/A';
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
    };

    const formatAddress = (addr) => {
        if (!addr) return 'N/A';
        return [addr.line1, addr.line2, addr.city, addr.postalCode].filter(Boolean).join(', ');
    };

    return (
        <section className="w-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Credit Accounts
                </h2>
            </div>

            <div className="space-y-4">
                {(!data || data.length === 0) ? (
                    <div className="text-center py-8 px-4 bg-gray-50 rounded-xl">
                        <p className="text-gray-500">No credit account information available.</p>
                    </div>
                ) : (
                    data.map((account, index) => (
                        <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h1v5h-1z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lender</p>
                                        <p className="text-base font-bold text-gray-800">{account.subscriberName}</p>
                                        <p className="text-sm font-mono text-gray-600">{account.accountNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Balance</p>
                                        <p className="text-base font-bold text-gray-900">{formatCurrency(account.currentBalance)}</p>
                                    </div>
                                </div>
                         
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 ${account.amountOverdue > 0 ? 'bg-red-100' : 'bg-green-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <svg className={`w-6 h-6 ${account.amountOverdue > 0 ? 'text-red-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount Overdue</p>
                                        <p className={`text-base font-extrabold ${account.amountOverdue > 0 ? 'text-red-500' : 'text-green-600'}`}>
                                            {formatCurrency(account.amountOverdue)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM12 11a3 3 0 100-6 3 3 0 000 6z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</p>
                                        <p className="text-sm text-gray-600">{formatAddress(account.address)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default CreditAccountsTable;