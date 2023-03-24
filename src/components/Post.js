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
  const [email, setEmail] = React.useState({});
  const {getPosts} = React.useContext(BenteviContext);
  const { title, userId, body, id } = props;
  const handleExpandClick = () => {
    setShowComments(!showComments);
    setExpanded(!expanded);
  };

  const renderComments = (comments) => comments.map((comment, index) => (
    <Comments
      key={index}
      body={comment.body}
      name={comment.name}
      email={comment.email}
      userId={comment.userId}
      id={comment.id}
    />));

  React.useEffect(() => {
    const getComments = async () => {
      const data = await getPosts(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      setComments(data);
    };
    const getEmailFromUserId = async () => {
      const data = await getPosts(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setEmail(data.email);
    }
    getComments();
    getEmailFromUserId();
  }, []);

  return (
    <Card id="post" sx={{maxWidth: 700}}>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
    </Card>
  );
}
