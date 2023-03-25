/* eslint-disable require-jsdoc */
import React, {useContext, useEffect} from 'react';
import Post from '../../components/Post';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import {BenteviContext} from '../../context/BenteviProvider';
import {useState} from 'react';
import '../../styles/Home.css';
import PostLoading from '../../components/PostLoading';
import {Button, Collapse} from '@mui/material';
import NewPost from '../../components/NewPost';


function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const {getPosts} = useContext(BenteviContext);
  const [update, setUpdate] = useState('false');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleNewPost = (value) => {
    const newPostAdd = {body: value, title: user.firstName,
      id: posts.length + 2, userId: 99};
    const postsLocal = JSON.parse(localStorage.getItem('posts'));
    if (postsLocal) {
      postsLocal.unshift(newPostAdd);
      localStorage.setItem('posts', JSON.stringify(postsLocal));
      setUpdate(`adicionouPost${value}`);
      setNewPost(!newPost);
      return;
    }
    localStorage.setItem('posts',
        JSON.stringify([newPostAdd]));
    posts.unshift(newPostAdd);
    setUpdate(`adicionouPost${value}`);
    setNewPost(!newPost);
  };

  const handleOptionClick = (id, setting) => {
    const postsLocal = JSON.parse(localStorage.getItem('posts'));
    if (setting === 'Excluir') {
      console.log(id, setting);
      const findPost = posts.findIndex((post) => post.id === id);
      posts.splice(findPost, 1);
      setPosts(posts);
      if (postsLocal) {
        const findPostLocal = postsLocal.findIndex((post) => post.id === id);
        postsLocal.splice(findPostLocal, 1);
        localStorage.setItem('posts', JSON.stringify(postsLocal));
      }
    }
    setUpdate(`removeu${id}`);
  };

  const renderPosts = (posts) => posts.map((post, index) => (
    <Post
      key={index}
      body={post.body}
      title={post.title}
      userId={post.userId}
      id={post.id}
      setUpdate={setUpdate}
      handleOptionClick={handleOptionClick}
    />));


  useEffect(() => {
    const regex = /removeu.*/;
    if (regex.test(update)) return;
    const showPosts = async () => {
      const data = await getPosts('https://jsonplaceholder.typicode.com/posts');
      const postsLocal = JSON.parse(localStorage.getItem('posts'));
      if (postsLocal) {
        postsLocal.forEach((post) => data.unshift(post));
      }
      setPosts(data);
    };
    showPosts();
  }, [newPost, update]);
  return (
    <div>
      <header>
        <ResponsiveAppBar />
      </header>
      <main>
        <div id="buttons-container">
          <Button
            onClick={() => {
              setNewPost(!newPost);
            }}
            variant="contained">Novo post</Button>
          <Button variant="contained">Pesquisar</Button>
        </div>
        <Collapse id="collapse" in={newPost} timeout="auto" unmountOnExit>
          <NewPost handleNewPost={handleNewPost}/>
        </Collapse>
        { posts.length > 1 ? renderPosts(posts) : <PostLoading />}
      </main>
    </div>
  );
}

export default Home;
