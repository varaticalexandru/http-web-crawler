


// crawl page
async function crawlPage(currentURL){

    console.log(`actively crawling: ${currentURL}`)

    const resp = await fetch(currentURL)
    console.log(resp.text)
}


crawlPage("https://google.com")