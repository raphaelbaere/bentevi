/* eslint-disable require-jsdoc */
import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import '../styles/UserProfile.css';
import BasicTabsProfile from './BasicTabsProfile';

export default function MainProfile(props) {
  const {setUpdate} = props;
  const user = JSON.parse(localStorage.getItem('user'));
  React.useEffect(() => {
  }, []);

  return (
    <Card id="userProfile" sx={{width: '80%'}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
            {`99`}
          </Avatar>
        }
        title={`${user.firstName}`}
        subheader={user.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user.email !== undefined ?
          <BasicTabsProfile user={user} setUpdate={setUpdate}/> : 'Loading'}
        </Typography>
      </CardContent>
    </Card>
  );
}

MainProfile.propTypes = {
  setUpdate: PropTypes.func,
};
