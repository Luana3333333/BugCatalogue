function parseFrontmatter(text) {
  const parts = text.split('---')
  const lines = parts[1].trim().split('\n')
  const data = {}
  
  lines.forEach(line => {
    const parts = line.split(':')
    const key = parts[0].trim()
const value = parts.slice(1).join(':').trim()
    data[key] = value
  })
  
  return data
}

fetch('https://api.github.com/repos/Luana3333333/BugCatalogue/contents/_kaefer')
  .then(response => response.json())
  .then(files => {
    files.forEach(file => {
      fetch(file.download_url)
        .then(response => response.text())
        .then(content => {
          const data = parseFrontmatter(content)
          console.log(data)
        })
    })
  })

  function createKaeferKarte(data) {
  const karte = document.createElement('div')
  karte.classList.add('kaefer-karte')
  
  karte.innerHTML = `
    <img src="${data.bild}" alt="${data.title}">
    <p>${data.title}</p>
  `
  
  document.querySelector('.kaefer-grid').appendChild(karte)
}