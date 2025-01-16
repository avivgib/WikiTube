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
    const elPlayList = document.querySelector('.play-list')
    let strHTML = ''

    playList.forEach(song => {
        const title = song.snippet.title
        const pic = song.snippet.thumbnails.default.url
        console.log('song data:', song)

        strHTML += `
                <div class="play-list-card">
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
    const elVideoPlayer = document.querySelector('.video-player')
    let strHTML = ''

    const videoId = video.id.videoId
    const title = video.snippet.title
    strHTML += `
        <div class="video">
            <iframe class="video-frame" src="https://www.youtube.com/embed/${videoId}"></iframe>
            <p>${title}</p>
        </div>`

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
            renderPlayListHTML(searchData)
        })
        .catch(err => {
            console.error('Error during search:', err);
        })
}