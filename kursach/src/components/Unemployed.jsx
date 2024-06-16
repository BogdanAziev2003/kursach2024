// DataTable.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddRecordForm from './AddRecordForm';
import EditRecordForm from './EditRecordForm'; // Импортируем новый компонент

const Unemployed = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Стейт для хранения выбранной записи

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3001/unemployed')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleAdd = (newRecord) => {
    setData([...data, newRecord]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/unemployed/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedRecord) => {
    const updatedData = data.map(item => (item.id === updatedRecord.id ? updatedRecord : item));
    setData(updatedData);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setSelectedRecord(null); // Очищаем выбранную запись перед открытием модального окна добавления
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Data Table</h1>
      <button className="add-button" onClick={openModal}>Добавить</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            {selectedRecord ? (
              <EditRecordForm record={selectedRecord} onUpdate={handleUpdate} />
            ) : (
              <AddRecordForm onAdd={handleAdd} />
            )}
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Profession</th>
            <th>Education</th>
            <th>Place of Last Work</th>
            <th>Position of Last Work</th>
            <th>Reason for Dismissal</th>
            <th>Family Status</th>
            <th>Living Conditions</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Requirements</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} onClick={() => handleEdit(row)}> {/* Добавляем обработчик клика для редактирования */}
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.surname}</td>
              <td>{row.age}</td>
              <td>{row.profession}</td>
              <td>{row.education}</td>
              <td>{row.palceoflastwork}</td>
              <td>{row.positionoflastwork}</td>
              <td>{row.reasonfordismissal}</td>
              <td>{row.familystatus}</td>
              <td>{row.livingconditions}</td>
              <td>{row.phone}</td>
              <td>{row.email}</td>
              <td>{row.requirements}</td>
              <td>
                <button className="deleteBtn" onClick={() => handleDelete(row.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Unemployed;
