import React, { useState } from "react"
import axios from "axios"

const AddVacancyForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    firm: "",
    position: "",
    workconditions: "",
    salary: "",
    livingconditions: "",
    specialistrequirements: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/vacancy", formData)
      .then((response) => {
        onAdd(response.data)
        setFormData({
          firm: "",
          position: "",
          workconditions: "",
          salary: "",
          livingconditions: "",
          specialistrequirements: "",
        })
      })
      .catch((error) => {
        console.error("There was an error adding the data!", error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firm"
        value={formData.firm}
        onChange={handleChange}
        placeholder="Firm"
        required
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
        required
      />
      <input
        type="text"
        name="workconditions"
        value={formData.workconditions}
        onChange={handleChange}
        placeholder="Workconditions"
        required
      />
      <input
        type="Number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        required
      />
      <input
        type="text"
        name="livingconditions"
        value={formData.livingconditions}
        onChange={handleChange}
        placeholder="Livingconditions"
        required
      />
      <input
        type="text"
        name="specialistrequirements"
        value={formData.specialistrequirements}
        onChange={handleChange}
        placeholder="Specialistrequirements"
        required
      />
      <button type="submit">Add Record</button>
    </form>
  )
}

export default AddVacancyForm
