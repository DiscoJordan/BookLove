import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TagsContext } from "../context/TagsContext";

const filter = createFilterOptions();
function InputOfTags({}) {
  const { setCurrentTag,tags } = useContext(TagsContext);
  const [value, setValue] = React.useState(null);
  useEffect(() => {
    setCurrentTag(value?.tagTitle);
    }, [value]);

  return (
    <Autocomplete
      value={value}
      onChange={(event,newValue) => {

        if (typeof newValue === "string") {
          setValue({
            tagTitle: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            tagTitle: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option.tagTitle
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            tagTitle: `Add "${inputValue}"`,
          });
          
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={tags}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.tagTitle;
      }}
      renderOption={(props, option) => <li {...props}>{option.tagTitle}</li>}
      sx={{
        width: 300,
        backgroundColor: "rgba(150,150,150,0.8)",
        color: "white",
        borderRadius: "50px",
        "& .MuiOutlinedInput-root":  { borderRadius:'50px',
          "&.Mui-focused fieldset": {borderRadius:'50px',
             borderColor: "#FF471F" },
        },
      }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Input Tag"
          InputLabelProps={{ sx:  {color: "white", fontWeight:'800', "&.Mui-focused": {fontWeight:'800',
             color: "white" } } }}
        />
      )}
    />
  );
}

  
export default InputOfTags;
