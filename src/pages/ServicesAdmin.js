import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/ServicesAdmin.css';

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [service, setService] = useState({
    id: null,
    name: '',
    category_id: '',
    price: '',
    duration_minutes: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/admin/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/admin/services', service);
      fetchServices();
    } catch (error) {
      console.error('Error creating service:', error);
    }
    setService({
      id: null,
      name: '',
      category_id: '',
      price: '',
      duration_minutes: '',
    });
    toggleModal();
  };

  const handleCloseButton = async (e) => {
    setService({
      id: null,
      name: '',
      category_id: '',
      price: '',
      duration_minutes: '',
    });
    toggleModal();
  };

  const handleDelete = async (serviceId) => {
    try {
      await api.delete(`/api/admin/services/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service) => {
    setService(service);
    toggleModal();
  };

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/admin/services/${service.id}`, service);
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
    }
    setService({
      id: null,
      name: '',
      category_id: '',
      price: '',
      duration_minutes: '',
    });
    toggleModal();
  };

  return (
    <>
      <div>ServicesAdmin</div>
      <button  className='table__button table__button--add' onClick={toggleModal}>Add Service</button>
      <table className="table">
        <thead>
          <tr className="table__row">
            <th className="table__header">Service ID</th>
            <th className="table__header">Service Name</th>
            <th className="table__header">Category ID</th>
            <th className="table__header">Price</th>
            <th className="table__header">Duration (Minutes)</th>
            <th className="table__header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr className="table__row" key={service.id}>
              <td className='table__data'>{service.id}</td>
              <td className='table__data'>{service.name}</td>
              <td className='table__data'>{service.category_id}</td>
              <td  className='table__data'>{service.price}</td>
              <td className='table__data'>{service.duration_minutes}</td>
              <td className='table__data'>
                <button className="table__button table__button--delete" onClick={() => handleDelete(service.id)}>Delete</button>
                <button className="table__button table__button--edit" onClick={() => handleEdit(service)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal__content">
            <h2 className="modal__title">Service</h2>
            <input
              className="modal__input"
              type="text"
              placeholder="Service Name"
              onChange={handleChange}
              value={service.name}
              name="name"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Category ID"
              onChange={handleChange}
              value={service.category_id}
              name="category_id"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Price"
              onChange={handleChange}
              value={service.price}
              name="price"
            />
            <input
              className="modal__input"
              type="text"
              placeholder="Duration (Minutes)"
              onChange={handleChange}
              value={service.duration_minutes}
              name="duration_minutes"
            />
            {service.id ? (
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

export default ServicesAdmin