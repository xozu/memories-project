import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow } from "@material-ui/core";

import { getPosts } from "../../actions/posts";
import useStyles from "./styles";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [ dispatch ]);

    return (
        <Grow in>
            <Container>
                <Grid
                    className={classes.mainContainer}
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
