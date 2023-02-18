function exportCSV(pages) {
    return pages.map(row => 
        row
        .map(String)    // converts every value to String
        .map(v => v.replaceAll('"', '""')) // escape double colons
        .map(v => `"${v}"`) // quote it
        .join(',')  // comma-separated
    ).join('\r\n')
}



let csv = exportCSV([
    [1, '2', '"3"'],
    [true, null, undefined],
  ]);

  console.log(csv)