const Report = require('../models/Report.js');
const { parseXmlReport } = require('../utils/xmlParser.js');

const uploadReport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const reportData = await parseXmlReport(req.file.buffer);

        if (!reportData.basicDetails.pan || !reportData.basicDetails.name) {
            return res.status(400).json({
                message: 'Critical data (Name or PAN) could not be found in the uploaded file.',
            });
        }
        
        if (!reportData.basicDetails.creditScore) {
             return res.status(400).json({
                message: 'The Credit Score is missing from the uploaded file. Cannot proceed.',
            });
        }


        const existingReport = await Report.findOne({ 'basicDetails.pan': reportData.basicDetails.pan });
        if (existingReport) {
            return res.status(409).json({ 
                message: 'A report with this PAN number already exists.',
                reportId: existingReport._id 
            });
        }

        const newReport = new Report(reportData);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);

    } catch (error) {
        console.error('Error during file processing:', error);
        // This catch now handles truly unexpected errors, like malformed XML.
        res.status(500).json({ message: 'Failed to process the file. It may be structurally broken.', error: error.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).json({ message: 'Report not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching report.' });
    }
};

const updateReport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file provided for update.' });
        }
        const reportId = req.params.id;
        const newReportData = await parseXmlReport(req.file.buffer);

        const updatedReport = await Report.findByIdAndUpdate(
            reportId,
            newReportData,
            { new: true, runValidators: true }
        );
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found to update.' });
        }
        res.status(200).json(updatedReport);
    } catch (error) {
        console.error('Error during report update:', error);
        res.status(500).json({ message: 'Server error during update.', error: error.message });
    }
};

// NEW FUNCTION: Get all reports
const getAllReports = async (req, res) => {
    try {
        // Find all reports and sort them by the most recently created
        const reports = await Report.find({}).sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Server error while fetching reports.' });
    }
};

// NEW FUNCTION: Delete a single report
const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found.' });
        }
        res.status(200).json({ message: 'Report deleted successfully.' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: 'Server error while deleting report.' });
    }
};

module.exports = {
    uploadReport,
    getReportById,
    updateReport,
    getAllReports, 
    deleteReport,
};