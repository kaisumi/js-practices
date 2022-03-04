async function getHtml (url) {
  const response = await fetch(url)
  return response.text()
}
getHtml('https://bootcamp.fjord.jp/')
  .then(data => {
    console.log(data)
  })
