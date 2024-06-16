import React, { useEffect, useState } from "react"
import axios from "axios"
import AddVacancyForm from "./AddVacancyForm"
import EditVacancyForm from "./EditVacancyForm"

function Vacancy() {
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null) // Стейт для хранения выбранной записи
  const [isArchivedModalOpen, setArchivedModalOpen] = useState(false)


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios
      .get("http://localhost:3001/vacancy")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error)
      })
  }
  const openModal = () => {
    setSelectedRecord(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openArchive = () => {
    debugger;
    setArchivedModalOpen(true)
  }

  const handleEdit = (record) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/vacancy/${id}`)
      .then(() => {
        fetchData()
      })
      .catch((error) => {
        console.error("Error deleting data:", error)
      })
  }

  const handleUpdate = (updatedRecord) => {
    const updatedData = data.map((item) =>
      item.id === updatedRecord.id ? updatedRecord : item
    )
    setData(updatedData)
    setIsModalOpen(false)
  }

  const handleAdd = (newRecord) => {
    setData([...data, newRecord])
    setIsModalOpen(false)
  }

  return (
    <div className="container">
      <button className="add-button" onClick={openModal}>
        Добавить
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            {selectedRecord ? (
              <EditVacancyForm
                record={selectedRecord}
                onUpdate={handleUpdate}
              />
            ) : (
              <AddVacancyForm onAdd={handleAdd} />
            )}
          </div>
        </div>
      )}
      {isArchivedModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={setArchivedModalOpen(false)}>
              &times;
            </span>
            archive
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>firm</th>
            <th>position</th>
            <th>workconditions</th>
            <th>salary</th>
            <th>livingconditions</th>
            <th>specialistrequirements</th>
            <th>Кнопка</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} >
              <td onClick={() => handleEdit(row)}>{row.id}</td>
              <td>{row.firm}</td>
              <td>{row.position}</td>
              <td>{row.workconditions}</td>
              <td>{row.salary}</td>
              <td>{row.livingconditions}</td>
              <td>{row.specialistrequirements}</td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(row.id)}
                >
                  Удалить
                </button>
              </td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => openArchive()}
                >
                  Архивировать
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Vacancy
