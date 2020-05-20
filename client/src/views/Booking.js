import React from "react";
import Form from "../components/Form";
import BookingServices from "../services/BookingServices";

function Booking() {
  /* 
- Setup props and pass it down to child Form elemenet
- Child fills in the form details and propegates it back to parent Booking
- Establish Api connection using BookingServices and pass metadata
*/
  function submitThisForm(metadata) {
    BookingServices.store(metadata);
  }

  return (
    <>
      <h1 className="display-1 m-4 text-center">Booking</h1>
      <Form triggerFormSubmit={submitThisForm} triggerRoute="/guests" />
    </>
  );
}

export default Booking;
