const xlsx = require('xlsx');
const path = require('path');
const MonthlyData = require('../models/monthlyData');
require("dotenv").config();

// ...existing code...

exports.uploadFile = async (req, res) => {
    console.log('Received file:', req.file);

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    console.log('File path:', filePath);

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet);
        console.log('Parsed data:', data);

        for (const row of data) {
            const { Month, Last_year, This_year, ...unexpectedFields } = row;

            if (Object.keys(unexpectedFields).length > 0) {
                console.warn('Unexpected fields found:', unexpectedFields);
                return res.status(400).send(`Bad Request: Unexpected fields found - ${Object.keys(unexpectedFields).join(', ')}`);
            }

            await MonthlyData.create({ Month, Last_year, This_year });
        }

        res.send('File uploaded and data saved to database');
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(400).send('Bad Request: Unable to process file');
    }
};
