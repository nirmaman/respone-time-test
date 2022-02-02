const fs = require('fs')
const axios = require('axios').default
const moment = require('moment')

let intervalId
let googleUrl = 'http://www.google.com/'

// variables
const dataPath = './data/web.json'

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      console.log(err)
    }
    if (!data) data = '{}'
    callback(returnJson ? JSON.parse(data) : data)
  })
}

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      console.log(err)
    }
    callback()
  })
}

const insertIntoFile = async (domain, timestamp, ms) => {
  try {
    timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    // console.log({domain, timestamp,ms});
    await readFile((data) => {
      //    console.log(data);
      //    data = JSON.parse(data);
      //console.log( data);
      if (!data[domain]) {
        data[domain] = { [timestamp]: ms }
      } else {
        data[domain][timestamp] = ms
      }
      writeFile(JSON.stringify(data, null, 2), () => {})
    }, true)
  } catch (error) {
    console.log(error)
  }
}

const readDetailes = async (req, res) => {
  try {
    readFile((data) => {
      for (const [key, val] of Object.entries(data)) {
      }
      res.status(200).send(JSON.stringify(data))
    })
  } catch (error) {
    res.sendStatus(500)
  }
}
const stopInterval = () => {
  try {
    clearInterval(intervalId)
    res.status(200).send('seccuess')
  } catch (error) {
    res.sendStatus(500)
  }
}

const calculateResTime = async (req, res) => {
  try {
    if (intervalId) {
      return
    }
    intervalId = setInterval(async () => {
      var start = new Date()
      var url = googleUrl
      await axios
        .get(url)
        .then(async function (res) {
          //console.log('Request took:', new Date() - start, 'ms');
          let res_time = new Date() - start
          await insertIntoFile('Google', new Date(), res_time)
        })
        .catch(function (res) {
          console.log(res)
        })

      //console.log("--");
      start = new Date()
      url = 'http://www.facebook.com/'
      await axios
        .get(url)
        .then(async function (res) {
          let res_time = new Date() - start
          await insertIntoFile('facebook', new Date(), res_time)

          //console.log('Request took:', new Date() - start, 'ms');
        })
        .catch(function (res) {
          console.log(res)
        })

      console.log('--')
      start = new Date()
      url = 'http://www.twitter.com/'
      await axios
        .get(url)
        .then(async function (res) {
          let res_time = new Date() - start
          await insertIntoFile('twitter', new Date(), res_time)
        })
        .catch(function (res) {
          console.log(res)
        })

      console.log('--')
      start = new Date()
      url = 'http://www.cnet.com/'
      await axios
        .get(url)
        .then(async function (res) {
          // console.log('Request took:', new Date() - start, 'ms');
          let res_time = new Date() - start
          await insertIntoFile('cnet', new Date(), res_time)
        })
        .catch(function (res) {
          console.log(res)
        })

      console.log('--')
      start = new Date()
      url = 'http://www.amazon.com/'
      await axios
        .get(url)
        .then(async function (res) {
          //  console.log('Request took:', new Date() - start, 'ms');
          let res_time = new Date() - start
          await insertIntoFile('amazon', new Date(), res_time)
        })

        .catch(function (res) {
          console.log(res)
        })
    }, 2000)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
    console.log(err)
  }
}

module.exports = {
  calculateResTime,
  stopInterval,
  readDetailes,
}
