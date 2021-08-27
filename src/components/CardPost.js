import React from "react";
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardstyle: {
    width: "90%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: "0 1px 6px 0 rgba(0,0,0,0.2)",
  },
  media: {
    height: 160,
    padding: 10,
    borderRadius: 10,
  },
  buttonstyle: {
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
}));

const CardPost = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={3} align="center">
      <Card className={classes.cardstyle}>
        <CardActionArea>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "green",
              }}
              align="flex-start"
            >
              {props.type}
            </Typography>
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 600,
              }}
              align="flex-end"
            >
              {props.date}
            </Typography>
          </div>

          <CardMedia
            className={classes.media}
            image={props.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              style={{ fontSize: 14, fontWeight: 700, color: "#41d27d" }}
              gutterBottom
              align="right"
            >
              -- {props.place}
            </Typography>
            <Typography
              gutterBottom
              style={{
                fontSize: 14,
                fontWeight: 600,
                height: 50,
              }}
              align="center"
            >
              {props.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title={props.url}>
              <Button
                size="small"
                color="primary"
                href={props.url}
                target="_blank"
              >
                conference url
              </Button>
            </Tooltip>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CardPost;
