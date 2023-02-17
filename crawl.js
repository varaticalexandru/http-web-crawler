// normalize URLs
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    let norm_url = `${urlObj.hostname}${urlObj.pathname}`

    if (norm_url.length > 0 && norm_url.slice(-1) == '/')
        norm_url = norm_url.slice(0, -1)

    return norm_url
} 

module.exports = {
    normalizeURL
}