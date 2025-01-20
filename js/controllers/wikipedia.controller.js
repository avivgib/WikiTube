'use strict'

function renderWikipedia() {
    return getWikiData(WIKI_STORAGE_KEY)
        .then(wikiData => {
            renderWikiDataHTML(wikiData)
            return wikiData
        })
        .catch(err => {
            console.error(`Failed to fetch wikiData: ${err}`)
        })
}

function renderWikiDataHTML(wikiListData) {
    const elWikipediaData = document.querySelector('.wikipedia-section')
    elWikipediaData.innerHTML = ''
    console.log(`inputSearchValue: ${wikiListData}`)
    debugger

    wikiListData.map(wikiData => {
        const { title, snippet } = wikiData

        elWikipediaData.innerHTML += `
                <div class="wiki-data">
                    <h5>${title}</h5>
                    <p>${snippet}</p>
                </div>`
    })
}