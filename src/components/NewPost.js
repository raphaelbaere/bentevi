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

export default function NewPost(props) {
  const [commentText, setCommentText] = React.useState('');
  const {handleNewPost} = props;
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Card data-testid="new-post-container"
      id="newPost" sx={{maxWidth: 700, minWidth: '200%'}}>
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
          label="Escreva seu post..."
          data-testid="newpost-input-text"
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                sx={{marginTop: '100px'}}
                data-testid="create-post-button"
                onClick={() => handleNewPost(commentText)}>
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

NewPost.propTypes = {
  handleNewPost: PropTypes.func,
};
