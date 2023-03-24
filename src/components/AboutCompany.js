/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';

function AboutCompany(props) {
  const {user: {company: {name, catchPhrase, bs}}} = props;
  return (
    <div>
      <h1>{name}</h1>
      <p>Empresa: {name}</p>
      <p>Frase da empresa: {catchPhrase}</p>
      <p>Atua: {bs}</p>
    </div>
  );
}

export default AboutCompany;
