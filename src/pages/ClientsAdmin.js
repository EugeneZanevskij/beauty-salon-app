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
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  }

  return (
    <>
      <div>ClientsAdmin</div>
      <button onClick={toggleModal}>Add Client</button>
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.phone_number}</td>
              <td>{client.email}</td>
              <td>{formatDate(client.birthday)}</td>
              <td>
                <button onClick={() => handleDelete(client.id)}>Delete</button>
                <button onClick={() => handleEdit(client)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
              value={client.birthday}
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