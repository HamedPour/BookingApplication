import React, { useState } from "react";
import BookingServices from "../services/BookingServices";

function Form() {
  const [metadata, setMetadata] = useState({
    firstname: "",
    lastname: "",
    check_in: "",
    check_out: "",
    roomtype: "1",
  });
  function formSubmit(e) {
    e.preventDefault();
    // setup redirect as well please
    BookingServices.store(metadata);
  }
  return (
    <>
      <form onSubmit={formSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={metadata.firstname}
            onChange={(e) =>
              setMetadata({ ...metadata, firstname: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={metadata.lastname}
            onChange={(e) =>
              setMetadata({ ...metadata, lastname: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Check In Date</label>
          <input
            type="text"
            value={metadata.check_in}
            onChange={(e) =>
              setMetadata({ ...metadata, check_in: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Check Out Date</label>
          <input
            type="text"
            value={metadata.check_out}
            onChange={(e) =>
              setMetadata({ ...metadata, check_out: e.target.value })
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Room Type</label>
          <br />
          <select
            onChange={(e) => {
              let theValue = null;
              if (e.target.value === "2") {
                theValue = "2";
              } else if (e.target.value === "3") {
                theValue = "3";
              } else {
                theValue = "1";
              }
              setMetadata({ ...metadata, roomtype: theValue });
            }}
          >
            <option value="1">Single</option>
            <option value="2">Double</option>
            <option value="3">Penthouse</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Book
        </button>
        <button className="btn btn-primary ml-4" type="reset">
          Reset
        </button>
      </form>
      <br />
    </>
  );
}

export default Form;
