import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/ClientsAdmin.css';

const ClientsAdmin = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [client, setClient] = useState({
    id: null,
    firstName: '',
    lastName: '',
    phone_number: '',
    email: '',
    birthday: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/api/admin/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/admin/clients', client);
      fetchClients();
    } catch (error) {
      console.error('Error creating client:', error);
    }
    setClient({
      id: null,
      firstName: '',
      lastName: '',
      phone_number: '',
      email: '',
      birthday: '',
    });
    toggleModal();
  };

  const handleCloseButton = () => {
    setClient({
      id: null,
      firstName: '',
      lastName: '',
      phone_number: '',
      email: '',
      birthday: '',
    });
    toggleModal();
  };

  const handleDelete = async (clientId) => {
    try {
      await api.delete(`/api/admin/clients/${clientId}`);
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleEdit = (client) => {
    setClient(client);
    toggleModal();
  };

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/clients/${client.id}`, client);
      fetchClients();
    } catch (error) {
      console.error('Error updating client:', error);
    }
    setClient({
      id: null,
      firstName: '',
      lastName: '',
      phone_number: '',
      email: '',
      birthday: '',
    });
    toggleModal();
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return (
    <>
      <div>ClientsAdmin</div>
      <button  className='table__button table__button--add' onClick={toggleModal}>Add Client</button>
      <div className="table-container">
      <table className='table'>
        <thead>
          <tr className='table__row'>
            <th className='table__header'>Client ID</th>
            <th className='table__header'>First Name</th>
            <th className='table__header'>Last Name</th>
            <th className='table__header'>Phone Number</th>
            <th className='table__header'>Email</th>
            <th className='table__header'>Birthday</th>
            <th className='table__header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr className='table__row' key={client.id}>
              <td className='table__data'>{client.id}</td>
              <td className='table__data'>{client.firstName}</td>
              <td className='table__data'>{client.lastName}</td>
              <td className='table__data'>{client.phone_number}</td>
              <td className='table__data'>{client.email}</td>
              <td className='table__data'>{formatDate(client.birthday)}</td>
              <td>
                <button className='table__button table__button--delete' onClick={() => handleDelete(client.id)}>Delete</button>
                <button className='table__button table__button--edit' onClick={() => handleEdit(client)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Client</h2>
            <input
              className="modal__input"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              value={client.firstName}
              name="firstName"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              value={client.lastName}
              name="lastName"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Phone Number"
              onChange={handleChange}
              value={client.phone_number}
              name="phone_number"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={client.email}
              name="email"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Birthday"
              onChange={handleChange}
              value={formatDate(client.birthday)}
              name="birthday"
            />
            {client.id ? (
              <button onClick={handleUpdateButton}>Update</button>
            ) : (
              <button onClick={handleAddButton}>Add</button>
            )}
            <button onClick={handleCloseButton}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientsAdmin;