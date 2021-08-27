import React from "react";
import {
  Typography,
  makeStyles,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SearchBar from "./SearchBar";
import { useHistory } from "react-router-dom";

const localStyles = makeStyles((theme) => ({
  text: {
    fontSize: "1.5rem",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "42px",
    },
  },
  BlackButtonStyle: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "4px",
    marginBottom: "1rem",
    "&:hover": {
      background: "#2C2C2C",
      color: "#FFFFFF",
      boxShadow: "none !important",
    },
  },
  formControl: {
    minWidth: 120,
  },
}));

const Header = (props) => {
  const classes = localStyles();
  const [searchText, setSearchText] = React.useState("");
  const [filter, setfilter] = React.useState("");

  const onHandleFilterChange = (text) => {
    setSearchText(text.target.value);
  };

  const onHandleSearch = () => {
    props.searchClicked(searchText);
  };

  const onHandleKeyChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onHandleSearch();
    }
  };

  const onHandleReset = () => {
    setSearchText("");
    //props.resetClicked();
  };

  const handleChange = (event) => {
    setfilter(event.target.value);
    props.filter(event.target.value);
  };

  return (
    <div>
      <Grid container>
        <Grid
          container
          direction="row"
          justify="space-between"
          //alignItems="center"
          style={{ marginBottom: 15, fontWeight: 700 }}
        >
          <Grid item xs={12} md={8} align="left">
            <Typography className={classes.text}>{props.title}</Typography>
          </Grid>

          <Grid item xs={12} md={4} align="right">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filter}
                onChange={handleChange}
                label="Filter"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item justify="center" align="center" xs={12}>
          <SearchBar
            handleFilterChange={onHandleFilterChange}
            handleOnKeyPress={onHandleKeyChange}
            filter={searchText}
            handleSearch={onHandleSearch}
            handleReset={onHandleReset}
            placeholder={props.placeholder}
            trustedContact={props.trustedContact}
            searchIconText={props.searchIconText}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
