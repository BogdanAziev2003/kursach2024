import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddVacancyForm from './AddVacancyForm';
import EditVacancyForm from './EditVacancyForm';

function Vacancy() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isArchivedModalOpen, setArchivedModalOpen] = useState(false);
  const [dataInputValue, setDataInputValue] = useState('');
  const [salaryRange, setSalaryRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/vacancy')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const openModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openArchive = () => {
    setArchivedModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/vacancy/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const handleUpdate = (updatedRecord) => {
    const updatedData = data.map((item) =>
      item.id === updatedRecord.id ? updatedRecord : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setIsModalOpen(false);
  };

  const handleAdd = (newRecord) => {
    const updatedData = [...data, newRecord];
    setData(updatedData);
    setFilteredData(updatedData);
    setIsModalOpen(false);
  };

  const changeInput = (e) => {
    const value = e.target.value.toLowerCase();
    setDataInputValue(value);
    const filtered = data.filter((item) =>
      item.position.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    if (value < 0) {
      return;
    }
    setSalaryRange((prev) => ({ ...prev, [name]: value }));
  };

  const filterBySalary = () => {
    const { min, max } = salaryRange;
    axios
      .get(
        `http://localhost:3001/vacancy/salary?salaryFrom=${min}&salaryTo=${max}`
      )
      .then((response) => {
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('There was an error filtering the data!', error);
      });
  };

  const resetFilters = () => {
    setDataInputValue('');
    setSalaryRange({ min: '', max: '' });
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
            value={salaryRange.min}
            onChange={handleSalaryChange}
            type="number"
            placeholder="Мин. зарплата"
            min="0"
          />
          <input
            className="salary-input"
            name="max"
            value={salaryRange.max}
            onChange={handleSalaryChange}
            type="number"
            placeholder="Макс. зарплата"
            min="0"
          />
          <button className="filter-button" onClick={filterBySalary}>
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
            <span
              className="close-button"
              onClick={() => setArchivedModalOpen(false)}
            >
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
          {filteredData.map((row) => (
            <tr key={row.id}>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(row.id);
                  }}
                >
                  Удалить
                </button>
              </td>
              <td>
                <button className="deleteBtn" onClick={() => openArchive()}>
                  Архивировать
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vacancy;
