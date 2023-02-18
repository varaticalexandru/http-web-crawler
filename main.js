// imports
const { crawlPage } = require('./crawl.js')
const { printReport  } = require('./report.js')

// main function
async function main() {
    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log("too many command line args")
        process.exit(2)
    }

    // base URL
    const baseURL = process.argv[2];

    console.log(`starting crawl ${baseURL}...\n`)

    // call
    const pages = await crawlPage(baseURL, baseURL, {})

    console.log(`\ncrawl stopped ${baseURL}...`)
    console.log('printing results ...\n')

    // log the report
    printReport(pages)
}



main()