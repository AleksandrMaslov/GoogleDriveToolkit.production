const express = require('express')
const axios = require('axios')
const cors = require('cors');

const client = require('./client')

const PORT = process.env.SERVICE_PORT || 5000

const app = express()
app.use(cors());
app.options('*', cors());

const run = async () => {
  await client.connect()
  console.log('DB client connected');

  await client.query('CREATE TABLE IF NOT EXISTS mytable (i integer);')
  console.log('Table created');


  app.get('/set-increment', async (req, res) => {
    console.log('Set request');

    try {
      const last = await client.query('select i from mytable order by i desc limit 1')
      let toInsert = 0
      if (last.rows.length === 0) {
        toInsert = 1
      } else {
        toInsert = last.rows[0].i + 1
      }
      await client.query('insert into mytable (i) values ($1)', [toInsert])
      res.send('increment updated')
    } catch (error) {
      res.send(`${error.message}`)
    }
  })

  app.get('/api/set-increment', async (req, res) => {
    console.log('Set request /api');

    try {
      const last = await client.query('select i from mytable order by i desc limit 1')
      let toInsert = 0
      if (last.rows.length === 0) {
        toInsert = 1
      } else {
        toInsert = last.rows[0].i + 1
      }
      await client.query('insert into mytable (i) values ($1)', [toInsert])
      res.send('increment updated')
    } catch (error) {
      res.send(`${error.message}`)
    }
  })

  app.get('api/set-increment', async (req, res) => {
    console.log('Set request api');

    try {
      const last = await client.query('select i from mytable order by i desc limit 1')
      let toInsert = 0
      if (last.rows.length === 0) {
        toInsert = 1
      } else {
        toInsert = last.rows[0].i + 1
      }
      await client.query('insert into mytable (i) values ($1)', [toInsert])
      res.send('increment updated')
    } catch (error) {
      res.send(`${error.message}`)
    }
  })

  app.get('/get-increment', async (req, res) => {
    console.log('Get request');

    try {
      const result = await client.query('select max(i) from mytable')
      res.send({ max: result.rows[0].max })
    } catch (error) {
      res.send(`${error.message}`)
    }
  })

  app.get('/api/get-increment', async (req, res) => {
    console.log('Get request /api');

    try {
      const result = await client.query('select max(i) from mytable')
      res.send({ max: result.rows[0].max })
    } catch (error) {
      res.send(`${error.message}`)
    }
  })

  app.get('api/get-increment', async (req, res) => {
    console.log('Get request api');

    try {
      const result = await client.query('select max(i) from mytable')
      res.send({ max: result.rows[0].max })
    } catch (error) {
      res.send(`${error.message}`)
    }
  })


  app.listen(PORT, () => { console.log(`App listening at port: ${PORT}`) })
}

run()
