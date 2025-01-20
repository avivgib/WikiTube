'use strict'

const WIKI_STORAGE_KEY = "Johnny Maestro"

function getWikiData(searchKey = '') {
    const wikiData = loadFromStorage(WIKI_STORAGE_KEY)

    if (wikiData && wikiData.length) {
        console.log('Loading data from local storage...')
        return Promise.resolve(wikiData)
    }
debugger
    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchKey}&format=json`;
    console.log(`url: ${url}`)

    return axios.get(url)
        .then(res => {
            const searchData = res.data.query.search
            saveToStorage(searchKey, searchData)
            return Promise.resolve(searchData)
        })
        .catch(err => {
            console.error('Error fetching from API:', err.response ? err.response.data : err.message)
            return Promise.reject(err)
        })
}