// EditRecordForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditRecordForm = ({ record, onUpdate }) => {
  const [formData, setFormData] = useState({ ...record });

  useEffect(() => {
    setFormData({ ...record });
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/unemployed/${formData.id}`, formData)
      .then(response => {
        onUpdate(response.data);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" required />
      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
      <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" required />
      <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" required />
      <input type="text" name="palceoflastwork" value={formData.palceoflastwork} onChange={handleChange} placeholder="Place of Last Work" required />
      <input type="text" name="positionoflastwork" value={formData.positionoflastwork} onChange={handleChange} placeholder="Position of Last Work" required />
      <input type="text" name="reasonfordismissal" value={formData.reasonfordismissal} onChange={handleChange} placeholder="Reason for Dismissal" required />
      <input type="text" name="familystatus" value={formData.familystatus} onChange={handleChange} placeholder="Family Status" required />
      <input type="text" name="livingconditions" value={formData.livingconditions} onChange={handleChange} placeholder="Living Conditions" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements" required />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecordForm;
