const xml2js = require('xml2js');

const getVal = (obj, path) => {
    if (!obj || !path) return undefined;
    const properties = path.split('.');
    return properties.reduce((prev, curr) => {
        if (prev && prev[curr]) {
            return prev[curr][0];
        }
        return undefined;
    }, obj);
};

const parseXmlReport = async (xmlBuffer) => {
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlBuffer);
    const root = result.INProfileResponse;
    const caisAccountBlock = getVal(root, 'CAIS_Account');

    const findName = (rootNode) => {
        const firstName = getVal(rootNode, 'Current_Application.Current_Application_Details.Current_Applicant_Details.First_Name');
        const lastName = getVal(rootNode, 'Current_Application.Current_Application_Details.Current_Applicant_Details.Last_Name');
        if (firstName || lastName) {
            return `${firstName || ''} ${lastName || ''}`.trim();
        }
        return undefined;
    };

    const findPan = (accountBlock) => {
        const accounts = accountBlock?.CAIS_Account_DETAILS; 
        if (Array.isArray(accounts)) {
            for (const acc of accounts) {
                const idDetailsList = acc.CAIS_Holder_ID_Details;
                if (Array.isArray(idDetailsList)) {
                    for (const idDetails of idDetailsList) {
                        const panVal = getVal(idDetails, 'Income_TAX_PAN');
                        if (panVal) return panVal;
                    }
                }
            }
        }
        return undefined;
    };

    const basicDetails = {
        name: findName(root),
        mobilePhone: getVal(root, 'Current_Application.Current_Application_Details.Current_Applicant_Details.MobilePhoneNumber'),
        pan: findPan(caisAccountBlock), 
        creditScore: parseInt(getVal(root, 'SCORE.BureauScore') || '0', 10),
    };


    const summary = getVal(caisAccountBlock, 'CAIS_Summary'); 
    const reportSummary = {
        totalAccounts: parseInt(getVal(summary, 'Credit_Account.CreditAccountTotal') || '0', 10),
        activeAccounts: parseInt(getVal(summary, 'Credit_Account.CreditAccountActive') || '0', 10),
        closedAccounts: parseInt(getVal(summary, 'Credit_Account.CreditAccountClosed') || '0', 10),
        currentBalanceAmount: parseInt(getVal(summary, 'Total_Outstanding_Balance.Outstanding_Balance_All') || '0', 10),
        securedAmount: parseInt(getVal(summary, 'Total_Outstanding_Balance.Outstanding_Balance_Secured') || '0', 10),
        unsecuredAmount: parseInt(getVal(summary, 'Total_Outstanding_Balance.Outstanding_Balance_UnSecured') || '0', 10),
        enquiriesLast7Days: parseInt(getVal(root, 'TotalCAPS_Summary.TotalCAPSLast7Days') || '0', 10),
    };

    // --- Credit Accounts ---
    const accountDetails = caisAccountBlock?.CAIS_Account_DETAILS || []; 
    const creditAccounts = Array.isArray(accountDetails)
        ? accountDetails.map(acc => {
              const address = getVal(acc, 'CAIS_Holder_Address_Details');
              return {
                  subscriberName: getVal(acc, 'Subscriber_Name')?.trim() || 'N/A',
                  accountNumber: getVal(acc, 'Account_Number'),
                  currentBalance: parseInt(getVal(acc, 'Current_Balance') || '0', 10),
                  amountOverdue: parseInt(getVal(acc, 'Amount_Past_Due') || '0', 10),
                  address: {
                      line1: getVal(address, 'First_Line_Of_Address_non_normalized'),
                      line2: getVal(address, 'Second_Line_Of_Address_non_normalized'),
                      city: getVal(address, 'City_non_normalized'),
                      postalCode: getVal(address, 'ZIP_Postal_Code_non_normalized'),
                  },
              };
          })
        : [];

    const finalReport = {
        basicDetails,
        reportSummary,
        creditAccounts,
    };
    
    return finalReport;
};

module.exports = { parseXmlReport };