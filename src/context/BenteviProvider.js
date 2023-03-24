/* eslint-disable require-jsdoc */
import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';

export const BenteviContext = createContext();

const makeFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
  }
};

const getPosts = async (url) => {
  const data = await makeFetch(url);
  return data;
};

getPosts();

function BenteviProvider({children}) {
  const values = useMemo(() => ({
    getPosts,
  }), [getPosts]);

  return (
    <BenteviContext.Provider value={ values }>
      {children}
    </BenteviContext.Provider>
  );
}


BenteviProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BenteviProvider;
