let mainArray = []
const mydata = './data/web.json'
let data

var xValuesGoogle = []
var yValuesGoogle = []

var xValuesfacebook = []
var yValuesfacebook = []

var xValuestwitter = []
var yValuestwitter = []

var xValuesCnet = []
var yValuesCnet = []

var xValuesAmazon = []
var yValuesAmazon = []

let intervalId
let intervalId1

let isPaused = false
function loadGragh() {
  document.getElementById('stopBtn').disabled = true
  readData()
  intervalId1 = setInterval(() => {
    if (!isPaused) {
      new Chart('google', {
        type: 'line',
        data: {
          labels: xValuesGoogle,
          datasets: [
            {
              backgroundColor: 'red',
              borderColor: 'black',
              data: yValuesGoogle,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'Google',
          },
        },
      })

      new Chart('facebook', {
        type: 'line',
        data: {
          labels: xValuesfacebook,
          datasets: [
            {
              backgroundColor: 'red',
              borderColor: 'black',
              data: yValuesfacebook,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'facebook',
          },
        },
      })

      new Chart('twitter', {
        type: 'line',
        data: {
          labels: xValuestwitter,
          datasets: [
            {
              backgroundColor: 'red',
              borderColor: 'black',
              data: yValuestwitter,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'twitter',
          },
        },
      })
      new Chart('cnet', {
        type: 'line',
        data: {
          labels: xValuesCnet,
          datasets: [
            {
              backgroundColor: 'red',
              borderColor: 'black',
              data: yValuesCnet,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'cnet',
          },
        },
      })
      new Chart('amazon', {
        type: 'line',
        data: {
          labels: xValuesAmazon,
          datasets: [
            {
              backgroundColor: 'red',
              borderColor: 'black',
              data: yValuesAmazon,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'amazon',
          },
        },
      })
    }
  }, 3000)
}

//when click start, make the Btn disable, and make a ajax call to calculte the response time.
// after calculte, get the data from backend.
function startBtn() {
  console.log('strtBtn')
  document.getElementById('startBtn').disabled = true
  document.getElementById('stopBtn').disabled = false

  isPaused = false
  $.ajax({
    url: 'http://localhost:3001/calculateResTime',
    success: function (result) {
      console.log('readData')
      readData()
    },
    error: function (err) {
      console.log('err', err)
    },
  })
}

//read the data from the backend, push to x,y for every web,
// slice the array to be max 10 digits.
function readData() {
  // if (intervalId) {
  //   clearInterval(intervalId)
  //   intervalId = undefined
  //   return
  // }
  intervalId = setInterval(() => {
    if (!isPaused) {
      $.ajax({
        url: 'http://localhost:3001/readDetailes',
        success: function (result) {
          const data = JSON.parse(result)
          //  console.log(data)
          if (data['Google'] != undefined) {
            for (const [timestamp, ms] of Object.entries(data['Google'])) {
              xValuesGoogle.push(timestamp)
              yValuesGoogle.push(ms)
            }

            xValuesGoogle = xValuesGoogle.slice(Math.max(xValuesGoogle.length - 10, 0))
            yValuesGoogle = yValuesGoogle.slice(Math.max(yValuesGoogle.length - 10, 0))
          }
          // console.log('xValuesGoogle: ' + xValuesGoogle)
          // console.log('yValuesGoogle: ' + yValuesGoogle)

          if (data['facebook'] != undefined)
            for (const [timestamp, ms] of Object.entries(data['facebook'])) {
              xValuesfacebook.push(timestamp)
              yValuesfacebook.push(ms)
            }
          xValuesfacebook = xValuesfacebook.slice(Math.max(xValuesfacebook.length - 10, 0))
          yValuesfacebook = yValuesfacebook.slice(Math.max(yValuesfacebook.length - 10, 0))

          // console.log('xValuesfacebook: ' + xValuesfacebook)
          // console.log(yValuesfacebook)

          if (data['twitter'] != undefined)
            for (const [timestamp, ms] of Object.entries(data['twitter'])) {
              xValuestwitter.push(timestamp)
              yValuestwitter.push(ms)
            }
          xValuestwitter = xValuestwitter.slice(Math.max(xValuestwitter.length - 10, 0))
          yValuestwitter = yValuestwitter.slice(Math.max(yValuestwitter.length - 10, 0))

          // console.log(xValuestwitter)
          // console.log(yValuestwitter)

          if (data['cnet'] != undefined)
            for (const [timestamp, ms] of Object.entries(data['cnet'])) {
              xValuesCnet.push(timestamp)
              yValuesCnet.push(ms)
            }
          xValuesCnet = xValuesCnet.slice(Math.max(xValuesCnet.length - 10, 0))
          yValuesCnet = yValuesCnet.slice(Math.max(yValuesCnet.length - 10, 0))

          // console.log(xValuesCnet)
          // console.log(yValuesCnet)

          if (data['amazon'] != undefined)
            for (const [timestamp, ms] of Object.entries(data['amazon'])) {
              xValuesAmazon.push(timestamp)
              yValuesAmazon.push(ms)
            }
          xValuesAmazon = xValuesAmazon.slice(Math.max(xValuesAmazon.length - 10, 0))
          yValuesAmazon = yValuesAmazon.slice(Math.max(yValuesAmazon.length - 10, 0))

          // console.log(xValuesAmazon)
          // console.log(yValuesAmazon)
        },
        error: function (err) {
          console.log('err', err)
        },
      })
    }
  }, 2000)
}

// flick stpBtn will make the startBtn disable, and stop the interval.
function stopBtn() {
  document.getElementById('stopBtn').disabled = true
  document.getElementById('startBtn').disabled = false

  $.ajax({
    url: 'http://localhost:3001/stopInterval',
    success: function (result) {
      console.log('stopBtn')
      isPaused = true
      // clearInterval(intervalId)
      // intervalId = undefined
      // clearInterval(intervalId1)
      // intervalId1 = undefined
    },
    error: function (err) {
      console.log('err', err)
    },
  })
}
