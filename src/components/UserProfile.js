/* eslint-disable */
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { BenteviContext } from '../context/BenteviProvider';
import Post from './Post';
import '../styles/UserProfile.css';
import BasicTabs from './BasicTabs';

const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserProfile(props) {
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState({});
  const {getPosts} = React.useContext(BenteviContext);
  const { id } = props;

  React.useEffect(() => {
    const getUser = async (id) => {
        const data = await getPosts(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(data);
    }
    const retrieveUserPosts = async () => {
        const allPosts = await getPosts('https://jsonplaceholder.typicode.com/posts');
        const userPosts = allPosts.filter((post) => post.userId = id)
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
        {user.email !== undefined ? <BasicTabs user={user} posts={posts}/> : 'Loading'}
        </Typography>
      </CardContent>
    </Card>
  );
}
