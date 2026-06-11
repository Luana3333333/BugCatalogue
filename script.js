fetch('https://api.github.com/repos/Luana3333333/BugCatalogue/contents/_kaefer')
  .then(response => response.json())
  .then(files => {
    files.forEach(file => {
      fetch(file.download_url)
        .then(response => response.text())
        .then(content => {
          console.log(content)
        })
    })
  })