/* eslint-disable require-jsdoc */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Post from './Post';
import '../styles/UserProfile.css';
import AboutProfile from './AboutProfile';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabsProfile(props) {
  const [value, setValue] = React.useState(0);
  const {user, setUpdate} = props;
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const favoritePosts = JSON.parse(localStorage.getItem('favorites')) || [];

  const handleOptionClick = (id, setting) => {
    const postsLocal = JSON.parse(localStorage.getItem('posts')) || [];
    if (setting === 'Excluir') {
      const findPostLocal = postsLocal.findIndex((post) => post.id === id);
      postsLocal.splice(findPostLocal, 1);
      localStorage.setItem('posts', JSON.stringify(postsLocal));
    }
    setUpdate(`removeu${id}`);
  };

  // eslint-disable-next-line react/prop-types
  const renderPosts = (posts, palavra) => {
    if (!posts.length > 0) {
      return (
        <p>Não há {palavra}</p>
      );
    }
    return posts.map((post) => (
      <Post
        key={post.id}
        body={post.body}
        title={post.title}
        userId={post.userId}
        id={post.id}
        setUpdate={setUpdate}
        handleOptionClick={handleOptionClick}
      />));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
  }, []);

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value}
          onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sobre" {...a11yProps(0)} />
          <Tab label="Posts" {...a11yProps(1)} />
          <Tab label="Curtidas" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AboutProfile user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="posts-container">
          {posts ? renderPosts(posts, 'posts') : <p>Não há posts</p>}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="posts-container">
          {favoritePosts ?
           renderPosts(favoritePosts, 'curtidas') : <p>Não há curtidas</p>}
        </div>
      </TabPanel>
    </Box>
  );
}

BasicTabsProfile.propTypes = {
  setUpdate: PropTypes.func,
  user: PropTypes.any,
};
