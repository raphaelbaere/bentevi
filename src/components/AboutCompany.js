/* eslint-disable require-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';

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

AboutCompany.propTypes = {
  user: PropTypes.shape({
    company: PropTypes.shape({
      name: PropTypes.string,
      catchPhrase: PropTypes.string,
      bs: PropTypes.string,
    }),
  }),
};
