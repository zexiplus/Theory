(async function() {
  console.log(new Date)
  await sleep(3)
  console.log(new Date)
})()

async function sleep(s) {
  return new Promise(function(resolve) {
    setTimeout(resolve, s * 1000)
  })
}