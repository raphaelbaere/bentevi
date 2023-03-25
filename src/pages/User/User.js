/* eslint-disable require-jsdoc */
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import UserProfile from '../../components/UserProfile';

function User() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) return navigate('/');
  }, []);
  const {id} = useParams();
  if (!user) return navigate('/');
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
