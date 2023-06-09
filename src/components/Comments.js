/* eslint-disable require-jsdoc */
import PropTypes from 'prop-types';
import * as React from 'react';
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

export default function Comments(props) {
  const [favorite, setFavorite] = React.useState(false);
  const {name, body, email, postId, id} = props;
  const handleFavoriteComments = () => {
    const favoritesArray = JSON
        .parse(localStorage.getItem('favoritesComments'));
    if (favoritesArray) {
      if (favoritesArray[postId]) {
        const isFavorite = favoritesArray[postId].some((favorite) =>
          favorite.commentId === id);
        if (isFavorite) {
          const favoritePost = favoritesArray[postId].findIndex((favorite) =>
            favorite.commentId === id);
          favoritesArray[postId].splice(favoritePost, 1);
          localStorage.setItem('favoritesComments',
              JSON.stringify(favoritesArray));
          setFavorite(!favorite);
          return;
        }
        favoritesArray[postId].push({commentId: id});
        localStorage.setItem('favoritesComments',
            JSON.stringify(favoritesArray));
        setFavorite(!favorite);
        return;
      }
    }
    localStorage.setItem('favoritesComments',
        JSON.stringify({
          [postId]: [{name, body, email, postId: id, id, commentId: id}]}));
    setFavorite(!favorite);
  };

  const getFavoriteComments = () => {
    const favoritesArray = JSON
        .parse(localStorage.getItem('favoritesComments')) || [];
    if (favoritesArray[postId]) {
      const isFavorite = favoritesArray[postId].some((favorite) =>
        favorite.commentId === id);
      setFavorite(isFavorite);
    }
  };

  React.useEffect(() => {
    getFavoriteComments();
  }, []);

  return (
    <Card className="comment"
      sx={{maxWidth: 700, borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
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
          {favorite ?
          <FavoriteIcon sx={{color: 'rgb(57, 104, 204)'}}/> : <FavoriteIcon />}
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

Comments.propTypes = {
  body: PropTypes.any,
  email: PropTypes.any,
  id: PropTypes.any,
  name: PropTypes.any,
  postId: PropTypes.any,
};
