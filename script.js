function doGet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; 
    const data = sheet.getDataRange().getValues();
    
    const headers = data[0];
    const rows = data.slice(1);
    
    const jsonResponse = rows.map(row => {
      let obj = {};
      headers.forEach((header, i) => {
        // Limpiamos los nombres de encabezados por si tienen espacios
        obj[header.toString().trim()] = row[i];
      });
      return obj;
    });
    
    return ContentService.createTextOutput(JSON.stringify(jsonResponse))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({error: e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}