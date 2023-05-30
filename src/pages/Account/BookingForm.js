import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../styles/BookingForm.css';

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    master_id: '',
    service_id: '',
  });
  const [masterServicesId, setMasterServicesId] = useState();
  const [clientId, setClientId] = useState();
  const [masters, setMasters] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    api.get('/api/services')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  };

  const fetchMasters = async (e) => {
    api.post("/api/bookings/correspondingMasters", {
      service_id: e.target.value
    })
      .then((response) => {
        setMasters(response.data);
      })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceChange = (e) => {
    handleChange(e);
    fetchMasters(e);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await fetchMasterServicesId(e);
    await fetchClientId();
  
    if (masterServicesId && clientId) {
      const booking = {
        client_id: clientId,
        master_service_id: masterServicesId,
        date_signup: bookingData.date,
        time_signup: bookingData.time,
      };
  
      try {
        const response = await api.post('/api/bookings/bookings', booking);
        console.log('Booking submitted:', response.data);
        setBookingData({
          date: '',
          time: '',
          master_id: '',
          service_id: '',
        });
        setClientId(null);
        setMasterServicesId(null);
        setMasters([]);

      } catch (error) {
        console.error('Error submitting booking:', error);
      }
    } else {
      console.log('Click once again');
    }
  };
  
  const fetchClientId = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Assuming the user object is stored in localStorage
  
      if (user && user.email) {
        const { email } = user;
  
        const response = await api.post('/api/bookings/find_client', { email });
        const client = response.data;
  
        if (client && client.id) {
          setClientId(client.id);
        } else {
          console.error('Client not found.');
        }
      } else {
        console.error('User email not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };
  



  const fetchMasterServicesId = async (e) => {
    try {
      const requestData = {
        master_id: bookingData.master_id,
        service_id: bookingData.service_id,
      };
  
      const response = await api.post('/api/bookings/find_ms', requestData);
      const connection = response.data;
  
      if (connection) {
        setMasterServicesId(connection.id);
      } else {
        console.error('No matching connection found.');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label className="booking-form__label">Date:</label>
      <input
        className="booking-form__input"
        type="date"
        name="date"
        value={bookingData.date}
        onChange={handleChange}
      />

      <label className="booking-form__label">Time:</label>
      <input
        className="booking-form__input"
        type="time"
        name="time"
        value={bookingData.time}
        onChange={handleChange}
      />

      <label className="booking-form__label">Service:</label>
      <select
        className="booking-form__select"
        name="service_id"
        value={bookingData.service_id}
        onChange={handleServiceChange}
      >
        <option value="">Select a service</option>
        {services.map((service) => (
          <option value={service.id} key={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      <label className="booking-form__label">Master:</label>
      <select
        className="booking-form__select"
        name="master_id"
        value={bookingData.master_id}
        onChange={handleChange}
      >
        <option value="">Select a master</option>
        {masters.map((master) => (
          <option value={master.id} key={master.id}>
            {master.firstName} {master.lastName}
          </option>
        ))}
      </select>
      <button className="booking-form__button" type="submit">Book Appointment</button>
    </form>
  );
};

export { BookingForm };
