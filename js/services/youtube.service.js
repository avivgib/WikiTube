'use strict'

const MAX_API_CALLS = 1000
let apiCallsToday = 850
const PLAYLIST_STORAGE_KEY = 'savedPlayList'
let searchList = []
const YT_KEY = 'AIzaSyCcS-xjaZ9O97RQ0cWGvyME4-8Je_loTIE'

function getPlayList() {
    const playList = loadFromStorage(PLAYLIST_STORAGE_KEY)

    if (playList && playList.length) {
        console.log('Loading data from local storage...')
        return Promise.resolve(playList)
    }

    if (apiCallsToday >= MAX_API_CALLS) {
        console.log('Exceeded daily API call limit, using demo data.')
        return Promise.resolve(DEMO_DATA)
    }

    return axios.get(`https://www.googleapis.com/youtube/v3/search?key=${YT_KEY}&part=snippet&videoEmbeddable=true&type=video`)
        .then(res => {
            console.log('Loading data from API call...')
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

function getDataBySearch(value) {
    // SEARCHLIST_STORAGE_KEY.push(value)
    if (searchList.includes(value)) {
        console.log(`Value found in local storage: ${value}`)
        const newSearchData = loadFromStorage(value)

        if (newSearchData && newSearchData.length) {
            console.log('Loading data from local storage...')
            return Promise.resolve(newSearchData)
        }
    } 
    
    return axios.get(`https://www.googleapis.com/youtube/v3/search?key=${YT_KEY}&part=snippet&videoEmbeddable=true&type=video&maxResults=10&q=${encodeURIComponent(value)}`)
        .then(res => {
            console.log('Loading data from API call...')
            console.log('res.data:', res.data)
            const topSearch = res.data.items
            console.log('res.data.items:', res.data.items)
            searchList.push(value)
            saveToStorage(value, topSearch)
            return topSearch
        })
        .catch(err => {
            console.error('Error fetching from API:', err.response ? err.response.data : err.message)
            return Promise.reject(err)
        })
}