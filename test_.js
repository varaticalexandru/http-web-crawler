// normalize URLs
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    let norm_url = `${urlObj.hostname}${urlObj.pathname}`

    if (norm_url[norm_url.length-1] == '/')
        norm_url = norm_url.slice(0, norm_url.length-1)

    return  norm_url
} 



console.log(normalizeURL("https://scaler.com/topics/string-concatenation-javascript/"))
