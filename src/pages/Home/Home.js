/* eslint-disable require-jsdoc */
import React, {useContext, useEffect} from 'react';
import Post from '../../components/Post';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import {BenteviContext} from '../../context/BenteviProvider';
import {useState} from 'react';
import '../../styles/Home.css';
import PostLoading from '../../components/PostLoading';


function Home() {
  const [posts, setPosts] = useState([]);
  const {getPosts} = useContext(BenteviContext);

  const renderPosts = (posts) => posts.map((post, index) => (
    <Post
      key={index}
      body={post.body}
      title={post.title}
      userId={post.userId}
      id={post.id}
    />));

  useEffect(() => {
    const showPosts = async () => {
      const data = await getPosts('https://jsonplaceholder.typicode.com/posts');
      setPosts(data);
    };
    showPosts();
  }, []);
  return (
    <div>
      <header>
        <ResponsiveAppBar />
      </header>
      <main>
        { posts.length > 1 ? renderPosts(posts) : <PostLoading />}
      </main>
    </div>
  );
}

export default Home;
