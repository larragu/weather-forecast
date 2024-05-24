"use client";

import { KeyboardEvent, SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { SearchBoxOption } from "@/types";

interface SearchBoxProps {
  onChange: (event: SyntheticEvent) => void;
  onSubmit: (event: SyntheticEvent) => void;
  searchResults: SearchBoxOption[];
  searchValue: string | null;
}

const SearchBox = ({
  searchValue,
  searchResults,
  onSubmit,
  onChange,
}: SearchBoxProps): JSX.Element => {
  return (
    <Autocomplete
      id="autocomplete"
      freeSolo
      options={searchResults.map((option) => ({
        id: option.id,
        label: option.label,
      }))}
      onInputChange={onChange}
      onChange={onSubmit}
      renderInput={(params) => (
        <TextField
          {...params}
          id="searchbar"
          InputProps={{
            ...params.InputProps,
            onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.stopPropagation();

                onSubmit(e);
              }
            },
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
