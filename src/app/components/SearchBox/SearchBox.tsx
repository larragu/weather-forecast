"use client";

import { KeyboardEvent, SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { SearchBoxOption } from "@/types";
import { getOptionLabel } from "@/utils";

interface SearchBoxProps {
  onChange: (event: SyntheticEvent, value: string) => void;
  onSubmit: (
    event: SyntheticEvent,
    value: SearchBoxOption | string | null
  ) => void;
  searchResults: SearchBoxOption[];
  searchValue: string;
}

const SearchBox = ({
  searchValue,
  searchResults,
  onSubmit,
  onChange,
}: SearchBoxProps): JSX.Element => {
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      const value = (e.target as HTMLInputElement).value;
      onSubmit(e, value);
    }
  };

  return (
    <Autocomplete
      id="autocomplete"
      freeSolo
      options={searchResults}
      getOptionLabel={getOptionLabel}
      onInputChange={onChange}
      onChange={onSubmit}
      renderInput={(params) => (
        <TextField
          {...params}
          id="searchbar"
          InputProps={{
            ...params.InputProps,
            onKeyDown: keyDownHandler,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search by city"
          variant="outlined"
        />
      )}
      value={searchValue}
    />
  );
};

export default SearchBox;
