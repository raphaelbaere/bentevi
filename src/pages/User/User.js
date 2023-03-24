/* eslint-disable require-jsdoc */
import React from 'react';
import {useParams} from 'react-router-dom';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import UserProfile from '../../components/UserProfile';

function User() {
  const {id} = useParams();
  return (
    <div>
      <header>
        <ResponsiveAppBar />
      </header>
      <main>
        <UserProfile id={id} />
      </main>
    </div>
  );
}

export default User;
