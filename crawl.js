// import
const { JSDOM } = require('jsdom')

// crawl page
async function crawlPage(baseURL, currentURL, pages){
    
    const baseURLobj = new URL(baseURL)
    const currentURLobj = new URL(currentURL)

    // if we ecounter an external linking, skip it 
    if (baseURLobj.hostname != currentURLobj.hostname)
        return pages

    // check if we already crawled this page
    const normCurrentURL = normalizeURL(currentURL)
    if (pages[normCurrentURL] > 0) {
        // increment the count & return
        pages[normCurrentURL]++
        return pages
    }
        
    pages[normCurrentURL] = 1

    console.log(`actively crawling: ${currentURL}`)


    try {
        const resp = await fetch(currentURL) // send req to currentURL

        // if status code of response is not successful
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type") // get content type of response

        // if content type of response is not html
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }

        
        // get html body
        const htmlBody = await resp.text()

        // extract all the links (next URLs) from html body
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        // iterate over the links & recursively crawl these pages
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

           
    } catch (err) {
        console.log(`error on fetch: ${err.nessage}, on page: ${currentURL}`)
    } 

    return pages
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
                const urlObj = new URL(`${baseURL}${linkElement}`)
                let url = urlObj.href
                if (url.slice(-1) === '/')
                    url = url.slice(0, -1)
                urls.push(url)
                console.log(url)
            }
            catch (err) {
                console.log(`error with relative url: ${err.message}`) 
            }
        }
        else {
            // absolute URL
            try {
                const urlObj = new URL(`${linkElement}`)
                let url = urlObj.href
                if (url.slice(-1) === '/')
                    url = url.slice(0, -1)
                urls.push(url)
                console.log(url)
            }
            catch (err) {
                console.log(`error with absolute url: ${err.message}`) 
            }
             
        }
    } 

    return urls // arr of strings (URLs)
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