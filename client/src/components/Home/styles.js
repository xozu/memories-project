import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    [theme.breakpoints.down("sm")]: { /* small 이하로는 flexDirection을 column-reverse로 하라. */
        mainContainer: {
            flexDirection: "column-reverse",
        },
    }
}));