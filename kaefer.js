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

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

fetch(`https://raw.githubusercontent.com/Luana3333333/BugCatalogue/main/_kaefer/${id}.md`)
  .then(response => response.text())
  .then(content => {
    const data = parseFrontmatter(content)
    
    document.querySelector('header').innerHTML = `
      <h1>${data.title}</h1>
      <img src="${data.bild}" alt="${data.title}" class="header-bild">
    `
    
    document.querySelector('#kaefer-detail').innerHTML = `
      <p class="familie"><strong>Familie:</strong> ${data.familie}</p>
      <p><strong>Kategorie:</strong> ${data.kategorie}</p>
      <p>${data.beschreibung}</p>
      ${data.detailbild ? `
        <figure>
          <img src="${data.detailbild}" alt="${data.bildbeschreibung || data.title}">
          <figcaption>${data.bildbeschreibung || ''}</figcaption>
        </figure>
      ` : ''}
    `
  })