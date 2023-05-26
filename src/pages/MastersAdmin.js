import React, { useEffect, useState } from 'react';
import api from '../api';

const MastersAdmin = () => {
  const [masters, setMasters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [master, setMaster] = useState({
    id: null,
    firstName: '',
    lastName: '',
    coefficient: 0,
  });

  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = async () => {
    try {
      const response = await api.get('/api/admin/masters');
      setMasters(response.data);
    } catch (error) {
      console.error('Error fetching masters:', error);
    }
  };

  const handleChange = (e) => {
    setMaster({
      ...master,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/admin/masters', master);
      fetchMasters();
    } catch (error) {
      console.error('Error creating master:', error);
    }
    setMaster({
      id: null,
      firstName: '',
      lastName: '',
      coefficient: 0,
    });
    toggleModal();
  };

  const handleCloseButton = async (e) => {
    setMaster({
      id: null,
      firstName: '',
      lastName: '',
      coefficient: 0,
    });
    toggleModal();
  };

  const handleDelete = async (masterId) => {
    try {
      await api.delete(`/api/admin/masters/${masterId}`);
      fetchMasters();
    } catch (error) {
      console.error('Error deleting master:', error);
    }
  };

  const handleEdit = (master) => {
    setMaster(master);
    toggleModal();
  };

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/masters/${master.id}`, master);
      fetchMasters();
    } catch (error) {
      console.error('Error updating master:', error);
    }
    setMaster({
      id: null,
      firstName: '',
      lastName: '',
      coefficient: 0,
    });
    toggleModal();
  };

  return (
    <>
      <div>MastersAdmin</div>
      <button onClick={toggleModal}>Add Master</button>
      <table>
        <thead>
          <tr>
            <th>Master ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Coefficient</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {masters.map((master) => (
            <tr key={master.id}>
              <td>{master.id}</td>
              <td>{master.firstName}</td>
              <td>{master.lastName}</td>
              <td>{master.coefficient}</td>
              <td>
                <button onClick={() => handleDelete(master.id)}>Delete</button>
                <button onClick={() => handleEdit(master)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Master</h2>
            <input
              className="modal__input"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              value={master.firstName}
              name="firstName"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              value={master.lastName}
              name="lastName"
            />
            <input
              className="modal__input"
              type="number"
              placeholder="Coefficient"
              onChange={handleChange}
              value={master.coefficient}
              name="coefficient"
            />
            {master.id ? (
              <button onClick={handleUpdateButton}>Update</button>
            ) : (
              <button onClick={handleAddButton}>Add</button>
            )}
            <button onClick={handleCloseButton}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default MastersAdmin