const { parseQuery4, parseQuery5 } = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery4(query) {
    const { fields, table } = parseQuery4(query);
    const data = await readCSV(`${table}.csv`);

    // Filter the fields based on the query
    return data.map(row => {
        const filteredRow = {};
        fields.forEach(field => {
            filteredRow[field] = row[field];
        });
        return filteredRow;
    });
}

async function executeSELECTQuery5(query) {
    const { fields, table, whereClause } = parseQuery5(query);
    const data = await readCSV(`${table}.csv`);
    
    // Filtering based on WHERE clause
    const filteredData = whereClause
        ? data.filter(row => {
            const [field, value] = whereClause.split('=').map(s => s.trim());
            return row[field] === value;
        })
        : data;

    // Selecting the specified fields
    return filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });
}

module.exports = { executeSELECTQuery4, executeSELECTQuery5 };