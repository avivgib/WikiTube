'use strict'

// API Youtube - AIzaSyCcS-xjaZ9O97RQ0cWGvyME4-8Je_loTIE 
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
    // const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}`
    // console.log('Request URL:', apiUrl)
    
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}`)
    .then(res => {
        console.log('res.data:', res.data)
        const topSearch = res.data.items
        console.log('res.data.items:', topSearch)
        const elPlayList = document.querySelector('.play-list')
        let strHTML = ''
        
        topSearch.forEach( song => {
            const title = song.snippet.title
            const pic = song.snippet.thumbnails.default.url
            console.log('song data:', song)
            strHTML += `
                    <div class="play-list-card">
                        <p>${title}</p>
                        <img src="${pic}" alt="${title}" />
                    </div>`
        })

       innerHTML = strHTML
    })
    .catch(err => {
        console.error('Error:', err.response ? err.response.data : err.message)
    })
}


function renderCurrentVideo() {}
function renderWikipedia() {}