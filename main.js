// imports
const { crawlPage } = require('./crawl.js')

// main function
function main() {
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

    console.log(`starting crawl ${baseURL}...`)

    crawlPage(baseURL)
}



main()