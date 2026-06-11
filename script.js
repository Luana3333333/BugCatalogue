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

function createKaeferKarte(data) {
  const karte = document.createElement('div')
  karte.classList.add('kaefer-karte')
  
  karte.innerHTML = `
    <img src="${data.bild}" alt="${data.title}">
    <p>${data.title}</p>
  `
  
  return karte
}

fetch('https://api.github.com/repos/Luana3333333/BugCatalogue/contents/_kaefer')
  .then(response => response.json())
  .then(files => {
    console.log(files
    const alleKaefer = []

    files.forEach(file => {
      fetch(file.download_url)
        .then(response => response.text())
        .then(content => {
          const data = parseFrontmatter(content)
          alleKaefer.push(data)
console.log(alleKaefer.length, files.length)
          if (alleKaefer.length === files.length) {
            zeigeKategorien(alleKaefer)
          }
        })
    })
  })

function zeigeKategorien(kaefer) {
  const kategorien = ['Geflügelte Käfer', 'Gepanzerte Käfer', 'Rüsselkäfer']
  console.log(kaefer)
  const main = document.querySelector('main')

  kategorien.forEach(kategorie => {
    const gruppe = kaefer.filter(k => k.kategorie === kategorie)
    
    if (gruppe.length === 0) return

    const titel = document.createElement('h2')
    titel.textContent = kategorie
    main.appendChild(titel)

    const grid = document.createElement('div')
    grid.classList.add('kaefer-grid')
    main.appendChild(grid)

    gruppe.forEach(k => {
      grid.appendChild(createKaeferKarte(k))
    })
  })
}