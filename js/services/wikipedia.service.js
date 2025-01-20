'use strict'

const WIKI_SEARCH_KEY = "Johnny Maestro"

function fetchWikipediaArticles(searchTerm = '') {
    const cachedArticles = loadFromStorage(WIKI_SEARCH_KEY)

    if (cachedArticles  && cachedArticles .length) {
        console.log('Loading data from local storage...')
        return Promise.resolve(cachedArticles)
    }

    debugger
    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchTerm}&format=json`;
    console.log(`url: ${url}`)

    return axios.get(url)
        .then(response => {
            const articles = response.data.query.search
            saveToStorage(searchTerm, articles)
            return Promise.resolve(articles)
        })
        .catch(err => {
            console.error('Error fetching from Wikipedia API:', err.response ? err.response.data : err.message)
            return Promise.reject(err)
        })
}