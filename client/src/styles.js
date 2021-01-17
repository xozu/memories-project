import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        color: "rgba(0, 180, 250, 1)",
    },
    image: {
        marginLeft: "15px",
    },
    [theme.breakpoints.down("sm")]: { /* small 이하로는 flexDirection을 column-reverse로 하라. */
        mainContainer: {
            flexDirection: "column-reverse",
        },
    }
}));