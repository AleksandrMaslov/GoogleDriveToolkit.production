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

  await client.query('CREATE TABLE IF NOT EXISTS mytable (i integer);')

  app.get('/set-increment', async (req, res) => {
    const last = await client.query('select i from mytable order by i desc limit 1')
    let toInsert = 0
    if (last.rows.length === 0) {
      toInsert = 1
    } else {
      toInsert = last.rows[0].i + 1
    }
    await client.query('insert into mytable (i) values ($1)', [toInsert])
    res.send('increment updated')
  })

  app.get('/get-increment', async (req, res) => {
    const result = await client.query('select max(i) from mytable')
    res.send({ max: result.rows[0].max })
  })


  app.listen(PORT, () => { console.log(`App listening at port: ${PORT}`) })
}

run()
