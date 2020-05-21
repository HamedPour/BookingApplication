import React from "react";
import Form from "../components/Form";
import BookingServices from "../services/BookingServices";

function Booking() {
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
