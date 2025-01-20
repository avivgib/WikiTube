'use strict'

let gSearchQuery = 'Johnny Maestro'

function onInit() {
    onSearch(gSearchQuery)
}

function onSearch(searchInput = '') {
    const query = searchInput || document.querySelector('.search-input').value.trim()
    if (!query) {
        console.log('No search query available...')
        return
    }

    gSearchQuery = query
    console.log(`gSearchQuery: ${gSearchQuery}`)

    Promise.all([
        getData(gSearchQuery),
        fetchWikipediaArticles(gSearchQuery)
    ])
    .then(([youtubeResults, wikipediaResults]) => {
        console.log(`Search Results (YouTube): ${youtubeResults}`)
        console.log(`Search Results (wikipediaResults): ${wikipediaResults}`)
        
        saveToStorage(searchInput + '_youtube', youtubeResults)
        saveToStorage(searchInput + '_wiki', wikipediaResults)
        
        renderPlayList(youtubeResults)
        renderVideo(youtubeResults[0])
        displayWikipediaResults(wikipediaResults)
    })
    .catch(err => {
        console.error('Error during search:', err);
    })
}

// Youtube Functions
function renderPlayList(playList) {
    const elPlayList = document.querySelector('.video-playlist')
    elPlayList.innerHTML = ''

    playList.forEach(video => {
        const { title, thumbnails } = video.snippet
        const { videoId } = video.id

        elPlayList.innerHTML += `
                <div class="play-list-card" onclick="onSelectVideo('${videoId}')" >
                    <p>${title}</p>
                    <img src="${thumbnails.default.url}" />
                </div>`
    })
}

function onSelectVideo(videoId) {
    const playList = loadFromStorage(gSearchQuery)
    if (!playList) {
        console.error('No search data available in localStorage.')
        return
    }

    const selectedVideo = playList.find(video => video.id.videoId === videoId)
    if (!selectedVideo) {
        console.error('Video not found in localStorage:', videoId)
        return
    }

    renderVideo(selectedVideo)
}

function renderVideo(video) {
    const elVideoPlayer = document.querySelector('.video-player-container')
    elVideoPlayer.innerHTML = ''

    const { videoId } = video.id
    const { title } = video.snippet

    elVideoPlayer.innerHTML = `
            <div class="video">
                <iframe class="video-frame" src="https://www.youtube.com/embed/${videoId}"></iframe>
                <p>${title}</p>
            </div>`
}

// Wikipedia Functions
function displayWikipediaResults(wikiResults) {
    const elWikipediaSection = document.querySelector('.wikipedia-section')
    elWikipediaSection.innerHTML = ''
    console.log(`Fetched Wikipedia results: ${wikiResults}`)

    if (wikiResults.length === 0) {
        elWikipediaSection.innerHTML = `
            <section class="wiki-data">
                <p>No results found for the search term.</p>
            </section>`  
        return      
    }

    wikiResults.slice(0, 4).map(wikiArticle => {
        const { title, snippet } = wikiArticle

        elWikipediaSection.innerHTML += `
                <section class="wiki-data">
                    <h3>${title}</h3>
                    <p>${snippet}</p>
                </section>`
    })
}