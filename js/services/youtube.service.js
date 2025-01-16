'use strict'

const MAX_API_CALLS = 1000
let apiCallsToday = 850
const PLAYLIST_STORAGE_KEY = 'savedPlayList'
const YT_KEY = 'AIzaSyCcS-xjaZ9O97RQ0cWGvyME4-8Je_loTIE'

const youtubeService = {
    getPlayList,
    getRandomVideo,
}

function getPlayList() {
    const playList = loadFromStorage(PLAYLIST_STORAGE_KEY)

    if (playList && playList.length) {
        return Promise.resolve(playList)
    }

    if (apiCallsToday >= MAX_API_CALLS) {
        console.log('Exceeded daily API call limit, using demo data.')
        return Promise.resolve(DEMO_DATA)
    }

    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}`)
        .then(res => {
            apiCallsToday++
            console.log('res.data:', res.data)
            const topSearch = res.data.items
            console.log('res.data.items:', res.data.items)
            saveToStorage(PLAYLIST_STORAGE_KEY, topSearch)
            return topSearch
        })
        .catch(err => {
            console.error('Error fetching from API:', err.response ? err.response.data : err.message)
            return Promise.reject(err)
        })
}

function getRandomVideo() {
    const playList = loadFromStorage(PLAYLIST_STORAGE_KEY)

    if (!playList || !playList.length) {
        console.error('No data available on Local Storage to render current video.')
        return null
    }

    const randomIdx = Math.floor(Math.random() * playList.length)
    return playList[randomIdx]
}