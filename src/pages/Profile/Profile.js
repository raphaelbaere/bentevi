/* eslint-disable require-jsdoc */
import React from 'react';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import MainProfile from '../../components/MainProfile';

function Profile() {
  const [update, setUpdate] = React.useState('update');

  React.useEffect(() => {
  }, [update]);
  return (
    <div>
      <header>
        <ResponsiveAppBar />
      </header>
      <main>
        <MainProfile setUpdate={setUpdate}/>
      </main>
    </div>
  );
}

export default Profile;
