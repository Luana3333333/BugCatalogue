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
          data.id = file.name.replace('.md', '')
          createFliegenderKaefer(data)
        })
    })
  })

function createFliegenderKaefer(data) {
  const container = document.getElementById('fly-container')
  const img = document.createElement('img')
  img.src = data.bild
  img.alt = data.title
  img.classList.add('fliegender-kaefer')
  img.title = data.title

  // Startposition zufällig
  let x = Math.random() * (window.innerWidth - 80)
  let y = Math.random() * (window.innerHeight - 80)

  // Zufällige Geschwindigkeit und Richtung
  let dx = (Math.random() - 0.5) * 4
  let dy = (Math.random() - 0.5) * 4

  img.style.left = x + 'px'
  img.style.top = y + 'px'

  // Klick öffnet Detailseite
  img.addEventListener('click', () => {
    window.location.href = `kaefer.html?id=${data.id}`
  })

  container.appendChild(img)

  // Animation
  function animate() {
    x += dx
    y += dy

    // Wände abprallen
    if (x <= 0 || x >= window.innerWidth - 80) {
      dx *= -1
      img.style.transform = `scaleX(${dx > 0 ? 1 : -1})`
    }
    if (y <= 0 || y >= window.innerHeight - 80) {
      dy *= -1
    }

    img.style.left = x + 'px'
    img.style.top = y + 'px'

    requestAnimationFrame(animate)
  }

  animate()
}