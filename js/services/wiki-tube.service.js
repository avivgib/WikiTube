'use strict'

const PLAYLIST_STORAGE_KEY = 'top-search-playlist'
const WIKI_SEARCH_KEY = "Johnny Maestro"
const YT_KEY = 'AIzaSyCcS-xjaZ9O97RQ0cWGvyME4-8Je_loTIE'

function getData(searchTerm = '') {
    const playList = loadFromStorage(searchTerm)
    if (playList && playList.length) {
        console.log('Loading data from local storage...')
        return Promise.resolve(playList)
    }

    const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_KEY}&part=snippet&videoEmbeddable=true&type=video&maxResults=20&q=${encodeURIComponent(searchTerm)}`
    // console.log(`YouTube API URL: ${url}`)

    return axios.get(url)
        .then(response => {
            // console.log('response.data:', response.data)
            const searchData = response.data.items
            saveToStorage(searchTerm + '_youtube', searchData)
            return Promise.resolve(searchData)
        })
        .catch(err => {
            console.error('Error fetching from API:', err.response ? err.response.data : err.message)
            return Promise.reject(err)
        })
}

function fetchWikipediaArticles(searchTerm = '') {
    const cachedArticles = loadFromStorage(searchTerm + '_wiki')
    if (cachedArticles && cachedArticles.length) {
        console.log('Loading data from local storage...')
        return Promise.resolve(cachedArticles)
    }

    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json`
    // console.log(`Wikipedia API URL: ${url}`)

    return axios.get(url)
        .then(response => {
            const articles = response.data.query.search
            if (!articles || articles.length === 0) {
                console.log('No Wikipedia articles found for the search term.')
                return []
            }
            saveToStorage(searchTerm + '_wiki', articles)
            return Promise.resolve(articles)
        })
        .catch(err => {
            console.error('Error fetching from Wikipedia API:', err.response ? err.response.data : err.message)
            return Promise.reject(err)
        })
}
