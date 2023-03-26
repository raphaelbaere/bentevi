/* eslint-disable require-jsdoc */
import PropTypes from 'prop-types';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {red} from '@mui/material/colors';
import {InputAdornment, TextField} from '@mui/material';
import {Send} from '@mui/icons-material';


export default function NewComment(props) {
  const {postId, addComment, handleExpandClick, handleCommentClick} = props;
  const [commentText, setCommentText] = React.useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleNewComment = () => {
    addComment(commentText, postId);
    handleExpandClick();
    handleCommentClick();
  };

  return (
    <Card id="newComment"
      sx={{maxWidth: 700, borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
            {user.firstName[0]}
          </Avatar>
        }
        title={user.firstName}
        subheader={user.email}
      />
      <CardContent>
        <TextField
          multiline
          rows={5}
          fullWidth
          label="Escreva seu comentário..."
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                sx={{marginTop: '100px'}}
                onClick={() => handleNewComment()}>
                <Send sx={{color: 'rgb(57, 104, 204)'}} />
              </IconButton>
            </InputAdornment>,
          }}
          value={commentText}
          onChange={(event) => {
            setCommentText(event.target.value);
          }}>
        </TextField>
      </CardContent>
    </Card>
  );
}

NewComment.propTypes = {
  addComment: PropTypes.func,
  handleCommentClick: PropTypes.func,
  handleExpandClick: PropTypes.func,
  postId: PropTypes.any,
};
