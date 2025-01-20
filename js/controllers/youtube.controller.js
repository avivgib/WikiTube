'use strict'

function renderPlayList() {
    return getData(PLAYLIST_STORAGE_KEY)
        .then(playList => {
            console.log(`Fetched playList: ${playList}`)
            renderPlayListHTML(playList)
            return playList
        })
        .catch(err => {
            console.error(`Failed to fetch playlist: ${err}`)
        })
}

function renderPlayListHTML(playList) {
    const elPlayList = document.querySelector('.video-playlist')
    elPlayList.innerHTML = ''

    playList.forEach(video => {
        const { title, thumbnails } = video.snippet
        const { videoId } = video.id

        elPlayList.innerHTML += `
                <div onclick="onSelectVideo('${videoId}')" class="play-list-card">
                    <p>${title}</p>
                    <img src="${thumbnails.default.url}" alt="${title}" />
                </div>`
    })
}

function renderVideo(video) {
    if (!video) {
        console.log('No video available to render.')
        return
    }

    renderVideoHTML(video)
}

function renderVideoHTML(video) {
    const elVideoPlayer = document.querySelector('.video-player-container')

    const { videoId } = video.id
    const { title } = video.snippet

    // const videoId = video.id.videoId
    // const title = video.snippet.title

    elVideoPlayer.innerHTML = `
            <div class="video">
                <iframe class="video-frame" src="https://www.youtube.com/embed/${videoId}"></iframe>
                <p>${title}</p>
            </div>`
}

// function renderWikipedia() { }

function onSelectVideo(videoId) {
    const playList = loadFromStorage(gCurrentSearch)
    if (!playList) {
        console.error('No search data available in localStorage.')
        return
    }

    const selectedVideo = playList.find(video => video.id.videoId === videoId)
    if (!selectedVideo) {
        console.error('Video not found in localStorage:', videoId)
        return
    }

    renderVideoHTML(selectedVideo)
}