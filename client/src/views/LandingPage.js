import React from "react";
import GuestServices from "../services/GuestServices";

function LandingPage() {
  async function pullData() {
    const guests = await GuestServices.index();
    console.log(guests);
  }

  return (
    <div className="LandingPage">
      <div className="jumbotron text-center">
        <h1>Landing Page</h1>
        <button onClick={pullData} className="btn btn-primary">
          Pull data
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
