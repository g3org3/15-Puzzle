const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const APIRoutes = require('./api')

// App Setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use((req, res, next) => {
  req.jsonResponse = req.headers.accept === 'application/json'
  next()
})

app.options('/api', (req, res) => {
  res.json({})
})
app.use('/api', APIRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.error(
    err.stack
      .split('\n')
      .filter(line => line.indexOf('node_modules') === -1)
      .join('\n')
  )
  res.json({ statusCode: err.status || 500, message: err.message })
})

// start the server
app.listen(2914, () => {
  console.log(`Server is running on :${2914}`)
})
