'use strict' 

let gCurrentSearch = ''

function onInit() {
    renderPlayList()
        .then(playList => {
            gCurrentSearch = PLAYLIST_STORAGE_KEY
            renderVideo(playList[0])
            // renderWikipedia()
        })
        .catch(err => {
            console.error(`Error initializing: ${err}`)
        })
}

function renderPlayList() {
    return getData(PLAYLIST_STORAGE_KEY)
        .then(playList => {
            console.log(`Fetched playList: ${playList}`)
            renderPlayListHTML(playList)
            console.log(`playList: ${playList}`)
            return playList
        })
        .catch(err => {
            console.error(`Failed to fetch playlist: ${err}`)
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

    elVideoPlayer.innerHTML = `
            <div class="video">
                <iframe class="video-frame" src="https://www.youtube.com/embed/${videoId}"></iframe>
                <p>${title}</p>
            </div>`
}

function renderWikipedia() { }

function onSearch() {
    const inputSearchValue = document.querySelector('.search-input').value
    if (!inputSearchValue || !inputSearchValue.length) {
        console.log('No search query available...')
        return
    }

    getData(inputSearchValue)
        .then(searchData => {
            console.log(`Search Data: ${searchData}`)
            saveToStorage(inputSearchValue, searchData)
            renderPlayListHTML(searchData)
            renderCurrentVideoHTML(searchData[0])
        })
        .catch(err => {
            console.error('Error during search:', err);
        })
}

function onSelectVideo(videoId) {
    const playList = loadFromStorage(gCurrentSearch)
    if (!playList) {
        console.error('No search data available in localStorage.')
        return
    }

    const selectedVideo = playList.find( video => video.id.videoId === videoId)
    if (!selectedVideo) {
        console.error('Video not found in localStorage:', videoId)
        return
    }

    renderCurrentVideoHTML(selectedVideo)
}