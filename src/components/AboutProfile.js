/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';

function AboutProfile(props) {
  const {user: {firstName, lastName, email}} = props;
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1>{`${firstName} ${lastName}`}</h1>
      <p>Username: {user.username ? `${username}` : 'Não especificado'}</p>
      <p>Email: {email}</p>
      <p>Endereço: {user.address ? `${city}, ${street},${suite}` :
       'Não especificado'}</p>
      <p>CEP: {user.address ? `${zipcode}` : 'Não especificado'}</p>
      <p>Latitude: {user.address ? {lat} : 'Não especificado'}</p>
      <p>Longitude: {user.address ? {lng} : 'Não especificado'}</p>
    </div>
  );
}

export default AboutProfile;
