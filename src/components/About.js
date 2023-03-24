/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';

function About(props) {
  const {user: {name, username, email,
    address: {street, suite, city, zipcode, geo: {lat, lng}}}} = props;
  return (
    <div>
      <h1>{name}</h1>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Endereço: {city}, {street}, {suite}</p>
      <p>CEP: {zipcode}</p>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>
    </div>
  );
}

export default About;
