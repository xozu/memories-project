import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import moment from "moment";
import { useDispatch } from "react-redux";

import thumbUpIcon from "../../../images/thumb-up-icon.png";
import deleteIcon from "../../../images/delete-icon.png";
import moreIcon from "../../../images/more-icon.png";
import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button color="primary" size="small" onClick={()=>setCurrentId(post._id)}>
                    <img src={moreIcon} alt="more" width="32" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => (`#${tag.trim()} `))}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
                    <img src={thumbUpIcon} alt="thumbup" width="32" />
                    &nbsp;Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    <img src={deleteIcon} alt="delete" width="32" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;