function sortPages(pages) {

    const pagesArr = Object.entries(pages) // obj -> arr of arrs

    // sort by number of times visited
    pagesArr.sort((a, b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })

    return pagesArr
}

function printReport(pages) {
    console.log('============')
    console.log('REPORT')
    console.log('============')

    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`)
    }

    console.log('============')
    console.log('END REPORT')
    console.log('============')
}

function exportCSV(pages) {
    return pages.map(row => 
        row
        .map(String)    // converts every value to String
        .map(v => v.replaceAll('"', '""')) // escape double colons
        .map(v => `"${v}"`) // quote it
        .join(',')  // comma-separated
    ).join('\r\n')
}

function exportFn(pages) {

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('export the results to a CSV file (Y/N): ', answer => {
        if (answer === "Y" || answer === "y") {
            // save contents as a file
            
            const content = exportCSV(sortPages(pages))
            saveFile(content, "export.csv")
            
        }
        else if (answer === "N" || answer === "n") {
        }
        else {
            console.log("invalind input")
        }
        
        console.log("exiting ...")
        readline.close()
    })

    

}

function saveFile(content, filename) {
    const fs = require('fs')

    fs.writeFile(`./${filename}`, content, function(err) {
        if (err)
            return console.log(err)
        console.log(`The file ${filename} was saved`)
    })
    
}


// export
module.exports = {
    sortPages,
    printReport,
    exportCSV,
    exportFn,
    saveFile
}