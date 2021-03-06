import React, { useState, useEffect } from "react";
import GuestServices from "../services/GuestServices";
import useDebounce from "../services/useDebounce";

function Guests() {
  const [guests, setGuests] = useState([]);

  const deBounceGuests = useDebounce(guests, 2000);

  useEffect(() => {
    // Fire off API call to get all guests
    // introduce debouncer here please
    GuestServices.index()
      .then((res) => {
        setGuests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deBounceGuests]);

  function deleteHandler(id) {
    GuestServices.delete(id);
  }
  return (
    <>
      <div className="container">
        <h1 className="display-1 text-center m-4">Guests</h1>
        <div className="row">
          {guests.map((guest) => {
            return (
              <div key={guest.id} className="card col-4">
                <div className="card-body">
                  <h4 className="card-title">{guest.firstname}</h4>
                  <h6 className="card-subtitle">{guest.lastname}</h6>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(guest.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Guests;
