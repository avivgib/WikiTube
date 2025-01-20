'use strict'

let gSearchQuery = ''

function onInit() {
    renderPlayList()
        .then(playList => {
            gSearchQuery = PLAYLIST_STORAGE_KEY
            renderVideo(playList[0])
            console.log(`[playList[0]]: ${[playList[0]]}`)
        })
        .catch(err => {
            console.error(`Error during initialization: ${err}`)
        })
    debugger
    renderWikipedia()
}

function onSearch() {
    const searchInput = document.querySelector('.search-input').value.trim()
    if (!searchInput) {
        console.log('No search query available...')
        return
    }

    gSearchQuery = searchInput
    console.log(`gSearchQuery: ${gSearchQuery}`)

    getData(searchInput)
        .then(results => {
            console.log(`Search Results: ${results}`)
            saveToStorage(searchInput, results)
            renderPlayListHTML(results)
            renderVideoHTML(results[0])
            renderWikiDataHTML(gSearchQuery)
        })
        .catch(err => {
            console.error('Error during search:', err);
        })
}
