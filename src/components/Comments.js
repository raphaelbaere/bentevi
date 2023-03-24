/* eslint-disable */
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Comments(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);
  const { name, body, email, postId, id } = props;
  const handleExpandClick = () => {
    setShowComments(!showComments);
    setExpanded(!expanded);
  };
  const handleFavoriteComments = () => {
    const favoritesArray = JSON.parse(localStorage.getItem('favoritesComments'));
    if (favoritesArray[postId]) {
      const isFavorite = favoritesArray[postId].some((favorite) => favorite.commentId === id);
      if (isFavorite) {
        const favoritePost = favoritesArray[postId].findIndex((favorite) => favorite.commentId === id);
        favoritesArray[postId].splice(favoritePost, 1);
        localStorage.setItem('favoritesComments', JSON.stringify(favoritesArray));
        setFavorite(!favorite);
        return;
      }
      favoritesArray[postId].push({ commentId: id });
      localStorage.setItem('favoritesComments', JSON.stringify(favoritesArray));
      setFavorite(!favorite);
      return;
    }
    localStorage.setItem('favoritesComments', JSON.stringify({ [postId]: [{ commentId: id}]}));
    setFavorite(!favorite);
  };

  const getFavoriteComments = () => {
    const favoritesArray = JSON.parse(localStorage.getItem('favoritesComments'));
    if (favoritesArray) {
      if (favoritesArray[postId]) {
        const isFavorite = favoritesArray[postId].some((favorite) => favorite.commentId === id);
        setFavorite(isFavorite);
      }
    }
  };

  React.useEffect(() => {
    getFavoriteComments();
  }, []);

  return (
    <Card id="comment" sx={{maxWidth: 700, borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
            {`${name}`}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${name}`}
        subheader={`${email}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`${body}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
        aria-label="add to favorites"
        onClick={handleFavoriteComments}>
          {favorite ? <FavoriteIcon sx={{ color: 'rgb(57, 104, 204)'}}/> : <FavoriteIcon />}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography id="answer" variant="body2" color="text.secondary">
          Responder
        </Typography>
      </CardActions>
    </Card>
  );
}