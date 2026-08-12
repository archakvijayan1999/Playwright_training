const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');

function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = { row: rowNumber, column: colNumber };
            }
        });
    });
    return output;
}

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

test('TC:01 Excel download Upload', async ({ page }) => {
    const textSearch = 'Banana';
    const updateValue = '350';
    const filePath = '/home/archa/Downloads/download.xlsx';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;

    //Saving the downloaded file to local disk path
    await download.saveAs(filePath);
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);
    const desiredRow = page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});