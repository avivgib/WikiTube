'use strict'

let gCurrentSearch = ''

function onInit() {
    renderPlayList()
        .then(playList => {
            gCurrentSearch = PLAYLIST_STORAGE_KEY
            renderVideo(playList[0])
            console.log(`[playList[0]]: ${[playList[0]]}`)
        })
        .catch(err => {
            console.error(`Error initializing: ${err}`)
        })
    debugger
    renderWikipedia()
}

function onSearch() {
    const inputSearchValue = document.querySelector('.search-input').value.trim()
    if (!inputSearchValue) {
        console.log('No search query available...')
        return
    }

    gCurrentSearch = inputSearchValue
    console.log(`gCurrentSearch: ${gCurrentSearch}`)

    getData(inputSearchValue)
        .then(searchData => {
            console.log(`Search Data: ${searchData}`)
            saveToStorage(inputSearchValue, searchData)
            renderPlayListHTML(searchData)
            renderVideoHTML(searchData[0])
            renderWikiDataHTML(gCurrentSearch)
        })
        .catch(err => {
            console.error('Error during search:', err);
        })
}
