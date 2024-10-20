import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, TextField, alpha, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OriginalGame } from "../types/types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: 500,
  flexShrink: 1,
  marginLeft: theme.spacing(3),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledTextField = styled(TextField)(() => ({
  "& fieldset": {
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 1)",
  },
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 1)",
  },
  "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
    width: "inherit",
  },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    padding: theme.spacing(0.6, 1, 0.6, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#fff",
    // [theme.breakpoints.up("md")]: {
    //   maxWidth: "40ch",
    // },
  },
}));

interface SearchBarProps {
  games: OriginalGame[];
}

export default function SearchBar({ games }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: unknown
  ) => {
    setInputValue(""); // Reset the input value
    if (newValue) {
      navigate(`/game/${newValue}`);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledAutocomplete
        freeSolo
        id="free-solo-2-demo"
        options={games.map((game) => game.title)}
        inputValue={inputValue}
        onInputChange={(e, value) => setInputValue(value)}
        onChange={handleChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            placeholder="Search..."
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: null,
            }}
          />
        )}
      />
    </Search>
  );
}
