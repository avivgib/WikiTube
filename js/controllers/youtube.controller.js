'use strict'

function onInit() {
    renderPlayList()
    renderCurrentVideo()
    // renderWikipedia()
}

function renderPlayList() {
    getPlayList()
        .then(playList => {
            console.log(`Fetched playList: ${playList}`)
            renderPlayListHTML(playList)
        })
        .catch(err => {
            console.error('Failed to fetch playlist:', err)
        })
}

function renderPlayListHTML(playList) {
    const elPlayList = document.querySelector('.video-playlist')
    let strHTML = ''

    playList.forEach(video => {
        const title = video.snippet.title
        const pic = video.snippet.thumbnails.default.url
        console.log('video data:', video)

        strHTML += `
                <div onclick="onPlayVideo('${video.id.videoId}')" class="play-list-card">
                    <p>${title}</p>
                    <img src="${pic}" alt="${title}" />
                </div>`
    })

    elPlayList.innerHTML = strHTML
}


function renderCurrentVideo() {
    const randomVideo = getRandomVideo()

    if (!randomVideo) {
        console.log('No video available to render.')
        return
    }

    renderCurrentVideoHTML(randomVideo)
}

function renderCurrentVideoHTML(video) {
    const elVideoPlayer = document.querySelector('.video-player-container')
    let strHTML = ''

    const videoId = video.id.videoId
    const title = video.snippet.title
    strHTML += `
        <iframe class="video-frame" src="https://www.youtube.com/embed/${videoId}"></iframe>
        <p>${title}</p>`

    elVideoPlayer.innerHTML = strHTML
}


function renderWikipedia() { }

function onSearch() {
    const inputSearchValue = document.querySelector('.search-input').value
    if (!inputSearchValue || !inputSearchValue.length) {
        console.log('No search query available...')
        return
    }

    getDataBySearch(inputSearchValue)
        .then(searchData => {
            console.log(`Search Data: ${searchData}`)

            if (!Array.isArray(searchData)) {
                console.error('Error: searchData is not an array')
                return
            }

            localStorage.setItem('lastSearch', JSON.stringify(searchData))
            renderPlayListHTML(searchData)
        })
        .catch(err => {
            console.error('Error during search:', err);
        })
}

function onPlayVideo(videoId) {
    const lastSearch = localStorage.getItem('lastSearch')
    if (!lastSearch) {
        console.error('No search data available in localStorage.')
        return
    }

    const playList = JSON.parse(lastSearch)

    const selectedVideo = playList.find( video => video.id.videoId === videoId)
    if (!selectedVideo) {
        console.error('Video not found in localStorage:', videoId)
        return
    }

    renderCurrentVideoHTML(selectedVideo)
}