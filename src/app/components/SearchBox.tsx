"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { SearchBoxOption } from "@/types";

interface SearchBoxProps {
  onSearchBoxInputChange: (_event: React.SyntheticEvent, newValue: any) => void;
  onSearchBoxChange: (_event: React.SyntheticEvent, newValue: any) => void;
  searchResults: SearchBoxOption[];
  searchValue: string | null;
}
const SearchBox = ({
  searchValue,
  searchResults,
  onSearchBoxChange,
  onSearchBoxInputChange,
}: SearchBoxProps) => {
  return (
    <Autocomplete
      freeSolo
      options={searchResults.map((option) => ({
        id: option.id,
        label: option.label,
      }))}
      onInputChange={onSearchBoxInputChange}
      onChange={onSearchBoxChange}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
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
