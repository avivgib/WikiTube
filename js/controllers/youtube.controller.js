'use strict'

const PLAYLIST_STORAGE_KEY = 'savedPlayList'
const CURRENT_STORAGE_KEY = 'savedCurrentMovie'

const MAX_API_CALLS = 1000
let apiCallsToday = 850


const YT_KEY = 'AIzaSyCcS-xjaZ9O97RQ0cWGvyME4-8Je_loTIE'
const value = 5

const gCurrentVideo = ''

function onInit() {
    debugger
    renderPlayList()
    // renderCurrentVideo()
    // renderWikipedia()
}


function renderPlayList() {
    const topSearch = loadFromStorage(PLAYLIST_STORAGE_KEY)

    if (topSearch && topSearch.length) {
        console.log('Data loaded from Local Storage:', topSearch)
        renderPlayListHTML(topSearch)
        return
    }

    if (apiCallsToday >= MAX_API_CALLS) {
        console.log('Exceeded daily API call limit, using demo data.')
        renderPlayListHTML(DEMO_DATA)
        return
    }

    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}`)
        .then(res => {
            apiCallsToday++
            console.log('res.data:', res.data)

            const topSearch = res.data.items
            console.log('res.data.items:', res.data.items)
            renderPlayListHTML(topSearch)
            saveToStorage(PLAYLIST_STORAGE_KEY, topSearch)
        })
        .catch(err => {
            console.error('Error fetching from API:', err.response ? err.response.data : err.message)
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

function renderCurrentVideo() { }
function renderWikipedia() { }