import React from "react";
import { Paper, InputBase, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const localStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "0.200rem 1rem",
    display: "flex",
    alignItems: "center",
    borderRadius: 30,
    boxShadow:
      "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12) !important",
  },
  searchInputBase: {
    "& input": {
      fontSize: "1rem",
      fontWeight: 600,
      padding: 0,
    },
  },
}));

export default function SearchBar(props) {
  const classes = localStyles();

  return (
    <Paper component="form" className={classes.searchPaper}>
      <InputBase
        style={{
          flex: 1,
          fontWeight: 500,
        }}
        className={classes.searchInputBase}
        placeholder={props.placeholder ? props.placeholder : "Search"}
        inputProps={{ "aria-label": "search google maps" }}
        fullWidth
        name={props.name ? props.name : "full_name_contains"}
        value={props.filter}
        onChange={props.handleFilterChange}
        onKeyPress={props.handleOnKeyPress}
      />
      <Tooltip title={props.searchIconText ? props.searchIconText : "Search"}>
        <IconButton
          aria-label="search"
          style={{ padding: 0 }}
          onClick={props.handleSearch}
        >
          <CheckCircleIcon
            style={{ height: "1.875rem", width: "1.875rem", color: "#E0E0E0" }}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="reset">
        <IconButton
          aria-label="reset"
          style={{ padding: 0 }}
          onClick={props.handleReset}
        >
          <CancelIcon
            style={{
              height: "1.875rem",
              width: "1.875rem",
              color: "#E0E0E0",
            }}
          />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
