const fs = require('fs')
const axios = require('axios').default
const moment = require('moment')

const dataPath = './data/web.json'
let intervalId
let googleUrl = 'http://www.google.com/'
let faceUrl = 'http://www.facebook.com/'
let twitUrl = 'http://www.twitter.com/'
let cnetUrl = 'http://www.cnet.com/'
let amazonUrl = 'http://www.amazon.com/'
// variables

// helper methods
const data = {} // the main data

const insertIntoFile = async (domain, timestamp, ms) => {
  try {
    timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
    if (!data[domain]) {
      data[domain] = { [timestamp]: ms }
    } else {
      data[domain][timestamp] = ms
    }
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

//return the data from backend to client
const readDetailes = (req, res) => {
  try {
    console.log(data)
    res.status(200).send(JSON.stringify(data))
  } catch (error) {
    res.sendStatus(500)
  }
}
const stopInterval = (req, res) => {
  try {
    clearInterval(intervalId)
    res.status(200).send('seccuess')
  } catch (error) {
    res.sendStatus(500)
  }
}
//calculte the response time for every web
const calculateResTime = async (req, res) => {
  try {
    // if (intervalId) {
    //   return
    // }
    intervalId = setInterval(async () => {
      var start = new Date()
      var url = googleUrl
      await axios
        .get(url)
        .then(async function (res) {
          console.log('Request took:', new Date() - start, 'ms')
          let res_time = new Date() - start
          await insertIntoFile('Google', new Date(), res_time)
        })
        .catch(function (res) {
          console.log(res)
        })

      console.log('--')
      start = new Date()
      url = faceUrl
      await axios
        .get(url)
        .then(async function (res) {
          let res_time = new Date() - start
          await insertIntoFile('facebook', new Date(), res_time)
          console.log('Request took:', new Date() - start, 'ms')
        })
        .catch(function (res) {
          console.log(res)
        })

      console.log('--')
      start = new Date()
      url = twitUrl
      await axios
        .get(url)
        .then(async function (res) {
          let res_time = new Date() - start
          await insertIntoFile('twitter', new Date(), res_time)
          console.log('Request took:', new Date() - start, 'ms')
        })
        .catch(function (res) {
          console.log(res)
        })

      console.log('--')
      start = new Date()
      url = cnetUrl
      await axios
        .get(url)
        .then(async function (res) {
          let res_time = new Date() - start
          await insertIntoFile('cnet', new Date(), res_time)
          console.log('Request took:', new Date() - start, 'ms')
        })
        .catch(function (res) {
          console.log(res)
        })

      console.log('--')
      start = new Date()
      url = amazonUrl
      await axios
        .get(url)
        .then(async function (res) {
          let res_time = new Date() - start
          await insertIntoFile('amazon', new Date(), res_time)
          console.log('Request took:', new Date() - start, 'ms')
        })

        .catch(function (res) {
          console.log(res)
        })
    }, 3000)
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
