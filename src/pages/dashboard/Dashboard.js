import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div>Page Dashboard</div>
      <div>
        <h1>This is the home page</h1>
        <Link to="sign-in">SignIn</Link>
        <Link to="sign-up">SignUp</Link>
      </div>
    </>
  );
}

export default Dashboard;
