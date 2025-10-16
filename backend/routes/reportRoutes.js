const express = require('express');
const multer = require('multer');
const { uploadReport, getReportById, updateReport,getAllReports,deleteReport } = require('../controllers/reportController.js');

const router = express.Router();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/xml' || file.mimetype === 'application/xml') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only XML files are allowed.'), false);
    }
};
const upload = multer({ storage, fileFilter });

router.post('/upload', upload.single('xmlfile'), uploadReport);
router.put('/:id', upload.single('xmlfile'), updateReport);
router.get('/', getAllReports); // GET /api/reports - Fetches all reports
router.delete('/:id', deleteReport);
router.get('/:id', getReportById);

module.exports = router;