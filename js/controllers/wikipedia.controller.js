'use strict'

function renderWikipedia() {
    return fetchWikipediaArticles(WIKI_SEARCH_KEY)
        .then(wikiResults => {
            console.log(`wikiResults: ${wikiResults}`)
            debugger
            displayWikipediaResults(wikiResults)
            return wikiResults
        })
        .catch(err => {
            console.error(`Failed to fetch wikiData: ${err}`)
        })
}

function displayWikipediaResults(wikiResults) {
    const elWikipediaSection = document.querySelector('.wikipedia-section')
    elWikipediaSection.innerHTML = ''
    console.log(`Fetched Wikipedia results: ${wikiResults}`)
    debugger

    wikiResults.slice(0, 4).map(wikiArticle => {
        const { title, snippet } = wikiArticle

        elWikipediaSection.innerHTML += `
                <section class="wiki-data">
                    <h3>${title}</h3>
                    <p>${snippet}</p>
                </section>`
    })
}