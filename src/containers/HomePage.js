import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  makeStyles,
  Backdrop,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import CardPost from "../components/CardPost";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  image: {
    width: "80%",
    height: 500,
  },
  cardStyle: {
    marginTop: theme.spacing(8),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const HomePage = (props) => {
  const classes = useStyles();

  const [loader, setLoader] = useState(false);
  const [paidEntries, setPaidEntries] = useState([]);
  const [freeEntries, setFreeEntries] = useState([]);
  const mergeResult = [...paidEntries, ...freeEntries];
  const [showData, setShowData] = useState([]);

  const convertPaidArrayData = (data) => {
    let arrayData = [];
    if (data.length > 0) {
      for (let i in data) {
        var resData = {};
        resData["id"] = data[i]["conference_id"];
        resData["name"] = data[i]["confName"];
        resData["city"] = data[i]["city"];
        resData["date"] = data[i]["confStartDate"];
        resData["url"] = data[i]["confUrl"];
        resData["image"] = data[i]["imageURL"];
        resData["type"] = data[i]["entryType"];
        arrayData.push(resData);
      }
    }
    return arrayData;
  };

  const convertFreeArrayData = (data) => {
    let arrayData = [];
    if (data.length > 0) {
      for (let i in data) {
        var resData = {};
        resData["id"] = data[i]["user_id"];
        resData["name"] = data[i]["confName"];
        resData["city"] = data[i]["city"];
        resData["date"] = data[i]["confStartDate"];
        resData["url"] = data[i]["confUrl"];
        resData["image"] = data[i]["imageURL"];
        resData["type"] = data[i]["entryType"];
        arrayData.push(resData);
      }
    }
    return arrayData;
  };

  const getUserInfo = async () => {
    setLoader(true);
    await axios
      .get(
        "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
      )
      .then((response) => {
        let paidUserData = [];
        let freeUserData = [];
        paidUserData = convertPaidArrayData(response.data.paid);
        freeUserData = convertFreeArrayData(response.data.free);
        setPaidEntries(paidUserData);
        setFreeEntries(freeUserData);
        setShowData([...paidUserData, ...freeUserData]);
        setLoader(false);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleFilter = (value) => {
    //console.log("filterValue", value);
    if (value === "Paid") {
      setShowData(paidEntries);
    } else if (value === "Free") {
      setShowData(freeEntries);
    } else {
      setShowData(mergeResult);
    }
  };

  return (
    <>
      {loader && (
        <Backdrop className={classes.backdrop} open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container className={classes.root} component="section">
        <Header
          title="List of upcoming technical conferences"
          filter={handleFilter}
        />

        <Grid container className={classes.cardStyle}>
          {showData.map((data) => {
            if (data.image[0] === '"') {
              data.image = data.image.replace(/['"]+/g, "");
            }

            return (
              <CardPost
                type={data.type}
                place={data.city}
                name={data.name}
                date={data.date}
                url={data.url}
                image={data.image}
              />
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
