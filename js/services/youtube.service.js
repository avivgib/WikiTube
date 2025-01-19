'use strict'

const PLAYLIST_STORAGE_KEY = 'top-search-playlist'
const YT_KEY = 'AIzaSyCcS-xjaZ9O97RQ0cWGvyME4-8Je_loTIE'

function getData(searchKey = '') {
    debugger
    const playList = loadFromStorage(searchKey)

    if (playList && playList.length) {
        console.log('Loading data from local storage...')
        return Promise.resolve(playList)
    }

    const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_KEY}&part=snippet&videoEmbeddable=true&type=video&maxResults=20${searchKey ? `&q=${encodeURIComponent(searchKey)}` : ''}`;
    console.log(`url: ${url}`)
    debugger

    return axios.get(url)
        .then(res => {
            const searchData = res.data.items
            console.log('res.data:', res.data)

            saveToStorage(searchKey, searchData)
            return Promise.resolve(searchData)
        })
        .catch(err => {
            console.error('Error fetching from API:', err.response ? err.response.data : err.message)
            return Promise.reject(err)
        })

}