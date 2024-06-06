"use client";

import { Search } from "@mui/icons-material";
import { OutlinedInput } from "@mui/material";

interface ISearchBarProps {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string | null) => void;
  inputPlaceholder?: string;
  disabled?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  inputPlaceholder = "Search...",
  disabled = false,
}: ISearchBarProps) => {
  return (
    <>
      <OutlinedInput
        disabled={disabled}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={inputPlaceholder}
        startAdornment={
          <Search
            color="secondary"
            sx={{
              mr: 1,
            }}
          />
        }
        size="small"
        sx={{
          borderRadius: 5,
          py: 0.5,
        }}
      />
    </>
  );
};
