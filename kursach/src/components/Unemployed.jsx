import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddRecordForm from './AddRecordForm';
import EditRecordForm from './EditRecordForm';

const Unemployed = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dataInputValue, setDataInputValue] = useState('');
  const [ageRange, setAgeRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/unemployed')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleAdd = (newRecord) => {
    const updatedData = [...data, newRecord];
    setData(updatedData);
    setFilteredData(updatedData);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/unemployed/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedRecord) => {
    const updatedData = data.map((item) =>
      item.id === updatedRecord.id ? updatedRecord : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeInput = (e) => {
    const value = e.target.value.toLowerCase();
    setDataInputValue(value);
    const filtered = data.filter(
      (item) =>
        item.surname.toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    if (value < 0 || value > 100) {
      return;
    }
    setAgeRange((prev) => ({ ...prev, [name]: value }));
  };

  const filterByAge = () => {
    const { min, max } = ageRange;
    axios
      .get(`http://localhost:3001/unemployed/age?ageFrom=${min}&ageTo=${max}`)
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('filter error', error);
      });
  };

  const resetFilters = () => {
    setDataInputValue('');
    setAgeRange({ min: '', max: '' });
    setFilteredData(data);
  };

  return (
    <div className="container">
      <h1>Data Table</h1>
      <div className="header-main">
        <button className="add-button" onClick={openModal}>
          Добавить
        </button>
        <input
          className="search-input"
          value={dataInputValue}
          onChange={changeInput}
          type="text"
          placeholder="Поиск..."
        />
      </div>
      <div className="filter-container">
        <div className="salary-filters">
          <input
            className="salary-input"
            name="min"
            value={ageRange.min}
            onChange={handleAgeChange}
            type="number"
            placeholder="Мин. возраст"
            min="0"
          />
          <input
            className="salary-input"
            name="max"
            value={ageRange.max}
            onChange={handleAgeChange}
            type="number"
            placeholder="Макс. возраст"
            min="0"
          />
          <button className="filter-button" onClick={filterByAge}>
            Выбрать
          </button>
          <button className="reset-button" onClick={resetFilters}>
            Сброс
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
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
          {filteredData.map((row) => (
            <tr key={row.id} onClick={() => handleEdit(row)}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.surname}</td>
              <td>{row.age}</td>
              <td>{row.profession}</td>
              <td>{row.education}</td>
              <td>{row.placeoflastwork}</td>
              <td>{row.positionoflastwork}</td>
              <td>{row.reasonfordismissal}</td>
              <td>{row.familystatus}</td>
              <td>{row.livingconditions}</td>
              <td>{row.phone}</td>
              <td>{row.email}</td>
              <td>{row.requirements}</td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(row.id);
                  }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Unemployed;
