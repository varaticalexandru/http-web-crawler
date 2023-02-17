// import
const { JSDOM } = require('jsdom')

// crawl page
async function crawlPage(currentURL){

    console.log(`actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        // if status code of response is not successful
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")

        // if content type of response is not html
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }
           
    } catch (error) {
        console.log(`error on fetch: ${error.nessage}, on page: ${currentURL}`)
    }
    
    
}

// get URLs from HTML
function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements){
        
        if (linkElement.href.slice(0, 1) === '/') { 
            // relative URL
            try {
                const url = new URL(`${baseURL}${linkElement}`)
                urls.push(normalizeURL(url.href))
            }
            catch (err) {
                console.log(`error with relative url: ${error.message}`) 
            }
        }
        else {
            // absolute URL
            try {
                const url = new URL(`${linkElement}`)
                urls.push(normalizeURL(linkElement.href))
            }
            catch (err) {
                console.log(`error with absolute url: ${err.message}`) 
            }
             
        }
    } 

    return urls
}


// normalize URL
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    let norm_url = `${urlObj.hostname}${urlObj.pathname}`

    if (norm_url.length > 0 && norm_url.slice(-1) == '/')
        norm_url = norm_url.slice(0, -1)

    return norm_url
} 

// export
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}