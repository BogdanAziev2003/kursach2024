const express = require("express")
const pg = require("pg")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const db = new pg.Pool({
  user: "gen_user",
  password: "B.Aziev-03",
  host: "94.241.169.9",
  port: "5432",
  database: "kursach",
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err)
    return
  }
  console.log("Connected to the database.")
})

app.get("/unemployed", (req, res) => {
  const sql = `SELECT * FROM unemployed WHERE archived = 'false'`
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json(results.rows)
  })
})

app.post("/unemployed", async (req, res) => {
  const {
    name,
    surname,
    age,
    profession,
    education,
    palceoflastwork,
    positionoflastwork,
    reasonfordismissal,
    familystatus,
    livingconditions,
    phone,
    email,
    requirements,
  } = req.body

  try {
    const result = await db.query(
      "INSERT INTO unemployed (name, surname, age, profession, education, palceoflastwork, positionoflastwork, reasonfordismissal, familystatus, livingconditions, phone, email, requirements) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        name,
        surname,
        age,
        profession,
        education,
        palceoflastwork,
        positionoflastwork,
        reasonfordismissal,
        familystatus,
        livingconditions,
        phone,
        email,
        requirements,
      ]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error("Error executing query", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.delete("/unemployed/:id", (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM unemployed WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User with ID ${id} deleted.`)
  })
})

app.put("/unemployed/:id", (req, res) => {
  const id = req.params.id
  const {
    name,
    surname,
    age,
    profession,
    education,
    palceoflastwork,
    positionoflastwork,
    reasonfordismissal,
    familystatus,
    livingconditions,
    phone,
    email,
    requirements,
  } = req.body

  db.query(
    "UPDATE unemployed SET name=$1, surname=$2, age=$3, profession=$4, education=$5, palceoflastwork=$6, positionoflastwork=$7, reasonfordismissal=$8, familystatus=$9, livingconditions=$10, phone=$11, email=$12, requirements=$13 WHERE id=$14 RETURNING *",
    [
      name,
      surname,
      age,
      profession,
      education,
      palceoflastwork,
      positionoflastwork,
      reasonfordismissal,
      familystatus,
      livingconditions,
      phone,
      email,
      requirements,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows[0])
    }
  )
})

app.get("/vacancy", (req, res) => {
  const sql = `SELECT * FROM vacancy WHERE archived = 'false'`
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json(results.rows)
  })
})

app.delete("/vacancy/:id", (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM vacancy WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User with ID ${id} deleted.`)
  })
})

app.post("/vacancy", async (req, res) => {
  const {
    firm,
    position,
    workconditions,
    salary,
    livingconditions,
    specialistrequirements,
  } = req.body

  try {
    const result = await db.query(
      "INSERT INTO vacancy (firm, position, workconditions, salary, livingconditions, specialistrequirements) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        firm,
        position,
        workconditions,
        salary,
        livingconditions,
        specialistrequirements,
      ]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error("Error executing query", err.stack)
    res.status(500).json({ error: "Internal Server Error" })
  }
})


app.put("/vacancy/:id", (req, res) => {
  const id = req.params.id
  const {
    firm,
    position,
    workconditions,
    salary,
    livingconditions,
    specialistrequirements,
  } = req.body

  console.log(firm);
  db.query(
    "UPDATE vacancy SET firm=$1, position=$2, workconditions=$3, salary=$4, livingconditions=$5, specialistrequirements=$6 WHERE id=$7 RETURNING *",
    [
      firm,
      position,
      workconditions,
      salary,
      livingconditions,
      specialistrequirements,
      id,
    ],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows[0])
    }
  )
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
