import React, { useState, useEffect } from 'react';
import api from '../../api';

const BookingForm = () => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    master_id: '',
    service_id: '',
  });
  const [masterServicesId, setMasterServicesId] = useState();
  const [masters, setMasters] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch the services data
    fetchServices();
  }, []);

  const fetchServices = async () => {
    api.get('/api/bookings/services')
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMasterServicesId(e).then(() => {
      console.log(masterServicesId);
    });
    // const masterServices = await api.get('/api/admin/master_services');
    // api.post('/api/bookings/bookings', bookingData)
    //   .then((response) => {
    //     // Handle successful submission
    //     console.log('Booking submitted:', response.data);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error('Error submitting booking:', error);
    //   });
  };

  // const fetchMasterServicesId = async (e) => {
  //   api.get('/api/admin/master_services')
  //     .then((response) => {
  //       const connections = response.data;
  //       console.log(connections);
  //       console.log(bookingData);
  //       const matchingConnection = connections.filter(
  //         (connection) =>
  //           connection.master_id == bookingData.master_id &&
  //           connection.service_id == bookingData.service_id
  //       );
  //       if (matchingConnection) {
  //         setMasterServicesId(matchingConnection.id);
  //       } else {
  //         console.error('No matching connection found.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching services:', error);
  //     });
  // };
  const fetchMasterServicesId = async (e) => {
    const requestData = {
      master_id: +bookingData.master_id,
      service_id: +bookingData.service_id
    };
  
    api.post('/api/bookings/find', requestData)
      .then((response) => {
        const connection = response.data;
        if (connection) {
          setMasterServicesId(connection.id);
        } else {
          console.error('No matching connection found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  };
  
  // const fetchMasterServicesId = async (e) => {
  //   api.get('/api/admin/master_services')
  //     .then((response) => {
  //       const connections = response.data;
  //       console.log(bookingData);
  //       // setMasterServicesId(connections);
  //       setMasterServicesId(connections.filter((connection) => connection.master_id === bookingData.master_id).filter((connection) => connection.service_id === bookingData.service_id)[0]);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching services:', error);
  //     });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={bookingData.date}
        onChange={handleChange}
      />

      <label>Time:</label>
      <input
        type="time"
        name="time"
        value={bookingData.time}
        onChange={handleChange}
      />

      <label>Master:</label>
      <select
        name="master_id"
        value={bookingData.master}
        onChange={handleChange}
      >
        <option value="">Select a master</option>
        {masters.map((master) => (
          <option value={master.id} key={master.id}>
            {master.firstName} {master.lastName}
          </option>
        ))}
      </select>

      <label>Service:</label>
      <select
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

      <button type="submit">Book Appointment</button>
    </form>
  );
};

export { BookingForm };
