import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [ postData, setPostData ] = useState({
        creator: "", title: "", message: "", tags: "", selectedFile: ""
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    // currentId 가 유효하고, 그 currentId에 해당하는 포스트가 바뀌었다.
    useEffect(()=>{
        if (post) {
            setPostData(post);
        }
    }, [post]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // 만약 현재 선택된 아이디가 있다면, 편집 상황이므로 updatePost 하고,
        // 아니면, 생성 상황이므로 createPost 를 디스패치하면 된다.
        // 디스패치 데이터는 두 가지 모두 포스트 인풋 데이터이다.
        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }

        clear();
    };

    // currentId 를 null 처리하고, 현재 인풋을 모두 클리어한다.
    const clear = (e) => {
        setCurrentId(null);

        setPostData({creator: "", title: "", message: "", tags: "", selectedFile: ""});
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing " : "Creating "} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={ postData.creator } onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={ postData.title } onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={ postData.message } onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={ postData.tags } onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" size="large" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;