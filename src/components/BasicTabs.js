/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Post from './Post';
import '../styles/UserProfile.css';
import About from './About';
import AboutCompany from './AboutCompany';

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

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const [update, setUpdate] = React.useState(false);
  const {posts, user} = props;

  const handleOptionClick = (id, setting) => {
    if (setting === 'Excluir') {
      const findPost = posts.findIndex((post) => post.id === id);
      posts.splice(findPost, 1);
    }
    setUpdate(`removeu${id}`);
  };
  // eslint-disable-next-line react/prop-types
  const renderPosts = (posts) => posts.map((post) => (
    <Post
      key={post.id}
      body={post.body}
      title={post.title}
      userId={post.userId}
      id={post.id}
      setUpdate={setUpdate}
      handleOptionClick={handleOptionClick}
    />));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
  }, [update]);

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sobre" {...a11yProps(0)} />
          <Tab label="Posts" {...a11yProps(1)} />
          <Tab label="Empresa" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <About user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div id="posts-container">
          {renderPosts(posts)}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AboutCompany user={user} />
      </TabPanel>
    </Box>
  );
}
