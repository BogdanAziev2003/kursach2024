import React, { useState, useEffect } from "react"
import axios from "axios"

const EditVacancyForm = ({ record, onUpdate }) => {
  const [formData, setFormData] = useState({ ...record })

  useEffect(() => {
    setFormData({ ...record })
  }, [record])

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
      .put(`http://localhost:3001/vacancy/${formData.id}`, formData)
      .then((response) => {
        onUpdate(response.data)
      })
      .catch((error) => {
        console.error("Error updating data:", error)
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
      <button type="submit">Save Changes</button>
    </form>
  )
}

export default EditVacancyForm
