import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/MastersAdmin.css';

const MastersAdmin = () => {
  const [masters, setMasters] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [master, setMaster] = useState({
    id: null,
    firstName: '',
    lastName: '',
    coefficient: 0,
    selectedServices: [],
  });

  useEffect(() => {
    fetchMasters();
    fetchServices();
  }, []);

  const fetchMasters = async () => {
    try {
      const response = await api.get('/api/admin/masters');
      setMasters(response.data);
    } catch (error) {
      console.error('Error fetching masters:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/admin/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'selectedServices') {
      const selectedServices = Array.from(e.target.selectedOptions, (option) =>
        Number(option.value)
      );
      setMaster({
        ...master,
        selectedServices,
      });
    } else {
      setMaster({
        ...master,
        [e.target.name]: e.target.value,
      });
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddButton = async (e) => {
  e.preventDefault();
  try {
    const { selectedServices, ...newMaster } = master;
    const response = await api.post('/api/admin/masters', newMaster);
    const masterId = response.data.id;
    console.log(response.data);

    const promises = selectedServices.map((serviceId) =>
      api.post('/api/admin/master_services', {
        master_id: masterId,
        service_id: serviceId,
      })
    );
    await Promise.all(promises);
    fetchMasters();
  } catch (error) {
    console.error('Error creating master:', error);
  }
  setMaster({
    id: null,
    firstName: '',
    lastName: '',
    coefficient: 0,
    selectedServices: [],
  });
  toggleModal();
};

  const handleCloseButton = async (e) => {
    setMaster({
      id: null,
      firstName: '',
      lastName: '',
      coefficient: 0,
      selectedServices: [],
    });
    toggleModal();
  };

  const handleDelete = async (masterId) => {
    try {
      await api.delete(`/api/admin/masters/${masterId}`);
      await api.delete(`/api/admin/master_services/${masterId}`);
      fetchMasters();
    } catch (error) {
      console.error('Error deleting master:', error);
    }
  };

  const handleEdit = async (master) => {
    try {
      const response = await api.get(`/api/admin/master_services`);
      const selectedServices = response.data.filter(
        (masterService) => masterService.master_id === master.id
      ).map((masterService) => masterService.service_id);
      console.log(selectedServices);
      setMaster({
        ...master,
        selectedServices,
      });
    } catch (error) {
      console.error('Error fetching master services:', error);
    }
    toggleModal();
  };

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    try {
      const { selectedServices, ...updatedMaster } = master;
      console.log(updatedMaster);
      console.log(selectedServices);
      await api.put(`/api/admin/masters/${updatedMaster.id}`, updatedMaster);
      await api.delete(`/api/admin/master_services/${updatedMaster.id}`);
      const promises = selectedServices.map((serviceId) =>
        api.post('/api/admin/master_services', {
          master_id: updatedMaster.id,
          service_id: serviceId,
        })
      );
      await Promise.all(promises);
      fetchMasters();
    } catch (error) {
      console.error('Error updating master:', error);
    }
    setMaster({
      id: null,
      firstName: '',
      lastName: '',
      coefficient: 0,
      selectedServices: [],
    });
    toggleModal();
  };

  return (
    <div className='admin-masters'>
      <h1 className='admin-masters__title'>Administrate Masters</h1>
      <button  className='table__button table__button--add' onClick={toggleModal}>Add Master</button>
      <table className='admin-masters__table table'>
        <thead>
          <tr className='table__row'>
            <th className='table__header'>Master ID</th>
            <th className='table__header'>First Name</th>
            <th className='table__header'>Last Name</th>
            <th className='table__header'>Coefficient</th>
            <th className='table__header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {masters.map((master) => (
            <tr className='table__row' key={master.id}>
              <td className='table__data'>{master.id}</td>
              <td className='table__data'>{master.firstName}</td>
              <td className='table__data'>{master.lastName}</td>
              <td className='table__data'>{master.coefficient}</td>
              <td className='table__data'>
                <button className='table__button table__button--delete' onClick={() => handleDelete(master.id)}>Delete</button>
                <button className='table__button table__button--edit' onClick={() => handleEdit(master)}>Edit</button>
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
            <select
              className="modal__input"
              multiple
              onChange={handleChange}
              value={master.selectedServices}
              name="selectedServices"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            {master.id ? (
              <button className="modal__button" onClick={handleUpdateButton}>Update</button>
            ) : (
              <button className="modal__button modal__button--add" onClick={handleAddButton}>Add</button>
            )}
            <button className="modal__button modal__button--close" onClick={handleCloseButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MastersAdmin;
