import React from 'react';
import { BookingForm } from './BookingForm';
import '../../styles/BookingPage.css';

const BookingPage = () => {
  return (
    <div className="booking-page">
      <h1 className="booking-page__title">Book An Appointment</h1>
      <h3 className="booking-page__subtitle">Here you can book an appointment</h3>
      <BookingForm />
      <p className="booking-page__paragraph">Click on the button <span className='booking-page__span'>twice</span> to book an appointment</p>
    </div>
  );
};

export default BookingPage;
