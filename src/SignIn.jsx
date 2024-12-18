import React, { useState } from "react";
import UserCard from "./components/UserCard.jsx"
import './Sign.css'
const SignUpForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  const query =`query User {
    user {
      auditRatio
      email
      firstName
      lastName
      login
      totalDown
      totalUp
      groupsByCaptainid {
        campus
        captainId
        captainLogin
        createdAt
        eventId
        id
        objectId
        path
        status
        updatedAt
      }
    }
    event_user(where: { eventId: { _in: [72, 20, 250] } }  order_by: { level: desc } ) {
      level
      userId
      userLogin
      eventId
    }
    transaction (where: { eventId: { _in: [72, 20, 250] } }){
      amount
      path
      type
      userLogin
      eventId
    }

    xp_view(where: { originEventId: { _in: [72, 20, 250] } }, order_by: { amount: asc }) {
        amount
        originEventId
        path
        userId
    }
  }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = `${usernameOrEmail}:${password}`;
    sessionStorage.setItem('credentials', credentials)
    const encodedCredentials = btoa(credentials);

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Authenticate user
      const authResponse = await fetch("https://learn.reboot01.com/api/auth/signin", {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!authResponse.ok) {
        const errorText = await authResponse.text();
        throw new Error(`Authentication failed: ${errorText}`);
      }

      const authData = await authResponse.json();

      // Fetch user data with the received JWT
      const userData = await fetcher(query, authData);
      setUser(userData);
      setIsSignedIn(true);

    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Incorrect email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  //console.log("Fetched User Data:", user);

  return (
    <>
      {!isSignedIn ? (
        <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="input-box">
          <i className='bx bxs-user icon-white'></i>
            <label htmlFor="usernameOrEmail"> Username or Email:</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            /> 
            
          </div>
          <div className="input-box">
          <i className='bx bxs-lock-alt icon-white' ></i>
            <label htmlFor="password"> Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /> 
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Submit"}
          </button>
        </form> 
        </div>
      ) : user ? (
        <div>
          <UserCard data={user} />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  );
};

export default SignUpForm;

async function fetcher(query, jwt) {
  const res = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  const result = await res.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}
