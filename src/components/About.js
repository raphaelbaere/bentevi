/* eslint-disable require-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';

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

About.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      suite: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
      geo: PropTypes.shape({
        lat: PropTypes.string,
        lng: PropTypes.string,
      }),
    }),
  }),
};
