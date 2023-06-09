import PropTypes from 'prop-types';
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
import {BenteviContext} from '../context/BenteviProvider';
import Comments from './Comments';
import {Link} from 'react-router-dom';
import {Menu, MenuItem, Skeleton} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import NewComment from './NewComment';
import '../styles/Home.css';

const ExpandMore = styled((props) => {
  const {...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// eslint-disable-next-line require-jsdoc
export default function Post(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [favorite, setFavorite] = React.useState(false);
  const {getPosts} = React.useContext(BenteviContext);
  const {title, userId, body, id, setUpdate, handleOptionClick} = props;
  const settings = ['Excluir'];
  const user = JSON.parse(localStorage.getItem('user'));
  const handleExpandClick = () => {
    setShowComments(!showComments);
    setExpanded(!expanded);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCommentClick = () => {
    setNewComment(!newComment);
  };
  const renderComments = (comments) => comments.map((comment) => (
    <Comments
      key={comment.id}
      body={comment.body}
      name={comment.name}
      email={comment.email}
      postId={comment.postId}
      id={comment.id}
    />));

  const addComment = (value, postId) => {
    const newComment = {body: value, name: user.firstName,
      email: user.email, postId: postId, id: postId + user.firstName};
    comments.unshift(newComment);
    const commentsLocal = JSON.parse(localStorage.getItem('comments'));
    if (commentsLocal) {
      if (commentsLocal[postId]) {
        commentsLocal[id].unshift(newComment);
        setUpdate(`adicionouComentário${postId + value}`);
        return;
      }
    }
    setUpdate(`adicionouComentário${postId + user.firstName}`);
    localStorage.setItem('comments', JSON.stringify({[id]: [newComment]}));
  };

  const removeFavorite = () => {
    const favoritesArray = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favoritesArray.some((favorite) =>
      favorite.postId === id);
    if (isFavorite) {
      const favoritePost = favoritesArray.findIndex((favorite) =>
        favorite.postId === id);
      favoritesArray.splice(favoritePost, 1);
      localStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setFavorite(!favorite);
      setUpdate(`removeuFavorito${id}`);
      return;
    }
  };

  const handleFavorite = () => {
    const favoritesArray = JSON.parse(localStorage.getItem('favorites'));
    if (favoritesArray) {
      const isFavorite = favoritesArray.some((favorite) =>
        favorite.postId === id);
      if (isFavorite) {
        removeFavorite();
        return;
      }
      favoritesArray.push({body, title, id, userId: 99, postId: id});
      localStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setFavorite(!favorite);
      setUpdate(`removeuFavorito${id}`);
      return;
    }
    localStorage.setItem('favorites',
        JSON.stringify([{body, title, id, userId: 99, postId: id}]));
    setFavorite(!favorite);
    setUpdate(`removeuFavorito${id}`);
  };

  const getFavorite = () => {
    const favoritesArray = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favoritesArray.some((favorite) =>
      favorite.postId === id);
    setFavorite(isFavorite);
    setUpdate(`removeuFavorito${id}`);
  };


  const getDataForComments = async () => {
    if (userId === 99) return [];
    const data = await getPosts(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return data;
  };

  React.useEffect(() => {
    const getComments = async () => {
      const data = await getDataForComments();
      const commentsLocal = JSON.parse(localStorage.getItem('comments')) || [];
      if (commentsLocal[id]) {
        commentsLocal[id].forEach((comment) => data.unshift(comment));
      }
      setComments(data);
      setUpdate(true);
    };
    const getEmailFromUserId = async () => {
      if (userId === 99) {
        setEmail(user.email);
        return;
      }
      const data = await getPosts(`https://jsonplaceholder.typicode.com/users/${userId}`) || {email: ''};
      setEmail(data.email);
    };
    getComments();
    getEmailFromUserId();
    getFavorite();
  }, []);

  return (
    <Card className="post" sx={{maxWidth: 700, minWidth: '55%'}}>
      <CardHeader
        avatar={
          <Link to={userId === 99 ? `/profile` : `/user/${userId}`}>
            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
              {`${userId}`}
            </Avatar>
          </Link>
        }
        action={
          <div>
            <IconButton
              onClick={handleOpenUserMenu}
              aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    data-testid="remove-button"
                    onClick={ () => {
                      handleOptionClick(id, setting);
                      removeFavorite();
                    }}
                  >{setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        }
        title={
          <Link to={userId === 99 ? `/profile` : `/user/${userId}`}>
            {`${title}`}
          </Link>}
        subheader={email !== '' ? (
          <Link to={userId === 99 ? `/profile` : `/user/${userId}`}>
            {`${email}`}
          </Link>) : <Skeleton width={100} />}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${body}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          expand={newComment.toString()}
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
          {favorite ?
           <div className="like-div">
             <p data-testid="one-like">1</p>
             <FavoriteIcon sx={{color: 'rgb(57, 104, 204)'}} /></div> :
            <FavoriteIcon data-testid="like-button"/>}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded.toString()}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography
            variant="body2"
            color="text.secondary"
            data-testid="mostrar-comments">
            {showComments ? 'Esconder comentários' : 'Mostrar comentários'}
          </Typography>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {comments ? renderComments(comments) : (
        <p>Não há comentários ainda...</p>)}
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

Post.propTypes = {
  body: PropTypes.any,
  handleOptionClick: PropTypes.func,
  id: PropTypes.any,
  setUpdate: PropTypes.func,
  title: PropTypes.any,
  userId: PropTypes.any,
};
