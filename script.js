function parseFrontmatter(text) {
  const parts = text.split('---')
  const lines = parts[1].trim().split('\n')
  const data = {}
  
  lines.forEach(line => {
    const parts = line.split(':')
    const key = parts[0].trim()
    const value = parts[1].trim()
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