const searcher = require('youtube-search')
const token = 'AIzaSyBqncgsve_BrwwUWtiCTjUzu_Z1hmqjjxs'

document.getElementById('search').addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault()
    search()
  }
})

function search () {
  if (document.getElementById('search').value !== null) {
    searcher(document.getElementById('search').value, {
      maxResults: 50,
      key: token
    }, (err, result) => {
      if (err) console.error(err)
      let temp = '<table class="table"><thead><tr><th scope="col">Title</th><th scope="col">View</th></tr></thead><tbody>'
      result.forEach((video) => {
        temp += '<tr><td>' + video.title + '</td><td><button type="button" style="background-color: #FF0000; color: #FFFFFF" class="btn" onclick="play(\'' + video.id + '\')"><i class="fas fa-play"></i></button></td></tr>'
      })
      temp += '</tbody></table>'
      document.getElementById('render').innerHTML = temp
    })
  }
}

function play (id) {
  document.location.href = 'https://www.youtube.com/embed/' + id
}
