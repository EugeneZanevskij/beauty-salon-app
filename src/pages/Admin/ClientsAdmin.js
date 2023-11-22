import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../styles/ClientsAdmin.css';

const ClientsAdmin = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [client, setClient] = useState({
    id: null,
    firstName: '',
    lastName: '',
    phone_number: '',
    email: '',
    birthday: '',
  });
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };
  
  useEffect(() => {
    fetchClients();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/clients', client);
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
    showModal ? toggleModal(): toggleViewModal();
  };

  const handleDelete = async (clientId) => {
    try {
      await api.delete(`/api/clients/${clientId}`);
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
      await api.put(`/api/clients/${client.id}`, client);
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

  
  const loadAppointments = async (email) => {
    const response = await api.get('/api/appointments');
    const data = response.data;
    setAppointments(data.filter((appointment) => appointment.email === email));
  };

  const toggleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleViewButton = (client) => {
    setClient(client);
    loadAppointments(client.email);
    toggleViewModal();
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter((client) => {
    const firstNameMatch = client.firstName.toLowerCase().includes(searchQuery.toLowerCase());
    const lastNameMatch = client.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return firstNameMatch || lastNameMatch;
  })

  return (
    <div className='admin-clients'>
      <h1 className='admin-clients__title'>Administrate Clients</h1>
      <input
        className="admin-clients__search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search clients"
      />
      <button className='table__button table__button--add' onClick={toggleModal}>Add Client</button>
      <div className="admin-clients__table table-container">
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
          {filteredClients.map((client) => (
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
                <button className='table__button table__button--view' onClick={() => handleViewButton(client)}>View</button>
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
              type="date"
              placeholder="Birthday"
              onChange={handleChange}
              value={client.birthday}
              name="birthday"
            />
            {client.id ? (
              <button className="modal__button" onClick={handleUpdateButton}>Update</button>
            ) : (
              <button className="modal__button modal__button--add" onClick={handleAddButton}>Add</button>
            )}
            <button className="modal__button modal__button--close" onClick={handleCloseButton}>Close</button>
          </div>
        </div>
      )}
      {viewModal && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">{client.firstName} {client.lastName}</h2>
            <table className="table">
              <thead>
                <tr className='table__row'>
                  <th className="table__header">Date</th>
                  <th className="table__header">Time</th>
                  <th className="table__header">Master</th>
                  <th className="table__header">Service</th>
                  <th className="table__header">Price</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr className="table__row" key={appointment.id}>
                    <td className="table__data">{formatDate(appointment.date_signup)}</td>
                    <td className="table__data">{appointment.time_signup}</td>
                    <td className="table__data">{appointment.masterFirstName} {appointment.masterLastName}</td>
                    <td className="table__data">{appointment.serviceName}</td>
                    <td className="table__data">Br {+appointment.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="modal__button modal__button--close" onClick={handleCloseButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsAdmin;