/* eslint-disable require-jsdoc */
import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import {BenteviContext} from '../context/BenteviProvider';
import '../styles/UserProfile.css';
import BasicTabs from './BasicTabs';

export default function UserProfile(props) {
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState({});
  const {getPosts} = React.useContext(BenteviContext);
  const {id} = props;

  React.useEffect(() => {
    const getUser = async (id) => {
      const data = await getPosts(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(data);
    };
    const retrieveUserPosts = async () => {
      const allPosts = await getPosts('https://jsonplaceholder.typicode.com/posts');
      const userPosts = allPosts.filter((post) => post.userId = id);
      setPosts(userPosts);
    };
    getUser(id);
    retrieveUserPosts();
  }, []);

  return (
    <Card id="userProfile" sx={{width: '80%'}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
            {`${user.id}`}
          </Avatar>
        }
        title={`${user.username}`}
        subheader={user.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user.email !== undefined ?
           <BasicTabs user={user} posts={posts}/> : 'Loading'}
        </Typography>
      </CardContent>
    </Card>
  );
}

UserProfile.propTypes = {
  id: PropTypes.any,
};
