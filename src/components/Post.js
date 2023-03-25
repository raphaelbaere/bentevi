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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BenteviContext } from '../context/BenteviProvider';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import NewComment from './NewComment';
import '../styles/Home.css';

const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [favorite, setFavorite] = React.useState(false);
  const {getPosts} = React.useContext(BenteviContext);
  const { title, userId, body, id } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  const handleExpandClick = () => {
    setShowComments(!showComments);
    setExpanded(!expanded);
  };
  const handleCommentClick = () => {
    setNewComment(!newComment);
  }
  const renderComments = (comments) => comments.map((comment, index) => (
    <Comments
      key={index}
      body={comment.body}
      name={comment.name}
      email={comment.email}
      postId={comment.postId}
      id={comment.id}
    />));

    const addComment = (value, postId) => {
      const newComment = { body: value, name: user.firstName, email: user.email, postId: postId, id: comments.length + 1}
      comments.unshift(newComment);
      const commentsLocal = JSON.parse(localStorage.getItem('comments'));
      if (commentsLocal) {
        if (commentsLocal[postId]) {
        commentsLocal[id].unshift(newComment);
        return;
        }
      }
      localStorage.setItem('comments', JSON.stringify({ [id]: [newComment]}));
    }

    const handleFavorite = () => {
      const favoritesArray = JSON.parse(localStorage.getItem('favorites'));
      if (favoritesArray) {
        const isFavorite = favoritesArray.some((favorite) => favorite.postId === id);
        if (isFavorite) {
          const favoritePost = favoritesArray.findIndex((favorite) => favorite.postId === id);
          favoritesArray.splice(favoritePost, 1);
          localStorage.setItem('favorites', JSON.stringify(favoritesArray));
          setFavorite(!favorite);
          return;
        }
        favoritesArray.push({ postId: id });
        localStorage.setItem('favorites', JSON.stringify(favoritesArray));
        setFavorite(!favorite);
        return;
      }
      localStorage.setItem('favorites', JSON.stringify([{ postId: id }]));
      setFavorite(!favorite);
    };

    const getFavorite = () => {
      const favoritesArray = JSON.parse(localStorage.getItem('favorites'));
      if (favoritesArray) {
        const isFavorite = favoritesArray.some((favorite) => favorite.postId === id);
        setFavorite(isFavorite);
      }
    }

  React.useEffect(() => {
    const getComments = async () => {
      const data = await getPosts(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      const commentsLocal = JSON.parse(localStorage.getItem('comments'));
      if (commentsLocal) {
        if (commentsLocal[id]) {
          commentsLocal[id].forEach((comment) => data.unshift(comment));
        }   
      }
      setComments(data);
    };
    const getEmailFromUserId = async () => {
      if (userId === 99) {
        setEmail(user.email);
        return;
      }
      const data = await getPosts(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setEmail(data.email);
    };
    getComments();
    getEmailFromUserId();
    getFavorite();        
  }, []);

  return (  
    <Card className="post" sx={{maxWidth: 700, minWidth: '55%'}}>
      <Link to={`/user/${userId}`}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
            {`${userId}`}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${title}`}
        subheader={email.length > 0 ? `${email}` : <Skeleton width={100} />}
      />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${body}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
        expand={newComment}
        onClick={handleCommentClick}
        aria-expanded={newComment}
        aria-label="add a new comment"
        >
          <MessageIcon />
        </IconButton>
        <IconButton
        aria-label="add to favorites"
        onClick={handleFavorite}
        >
          {favorite ? <FavoriteIcon sx={{ color: 'rgb(57, 104, 204)'}} /> : <FavoriteIcon />}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <Typography variant="body2" color="text.secondary">
          {showComments ? 'Esconder comentários' : 'Mostrar comentários'}
        </Typography>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {renderComments(comments)}
      </Collapse>
      <Collapse in={newComment} timeout="auto" unmountOnExit>
        <NewComment postId={id}
        addComment={addComment}
        handleExpandClick={handleExpandClick}
        handleCommentClick={handleCommentClick}/>
      </Collapse>
    </Card>
  );
}
