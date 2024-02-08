import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Box, Avatar, TextField, Autocomplete } from "@mui/material";

import logo1 from "../../../assets/images/logo_nct.png";
import logo2 from "../../../assets/images/logo_shinee.jpg";

const GroupDropdown2 = ({ defaultGroup, onChange }) => {
  // const groupItems = [
  //   { value: "NCT", label: "NCT", avatarSrc: logo1 },
  //   { value: "샤이니", label: "샤이니", avatarSrc: logo2 },
  //   { value: "세븐틴", label: "세븐틴", avatarSrc: logo1 },
  //   { value: "스트레이키즈", label: "스트레이키즈", avatarSrc: logo1 },
  // ];

  const [groupItems, setGroupItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/user/idol/group",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setGroupItems(response.data);
      } catch (error) {
        console.error("그룹 세팅 오류:", error);
      }
    };

    fetchData();
  }, []);

  const [value, setValue] = useState(defaultGroup);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        size="small"
        id="group-dropdown"
        options={groupItems}
        getOptionLabel={(option) => option.idolGroupName}
        // isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{
          width: "80vw",
          "& .MuiInputBase-root": { borderRadius: "10px" },
        }}
        noOptionsText="해당 그룹이 없습니다"
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <Avatar
              src={option.avatarSrc}
              sx={{ mr: 1, width: "1.5rem", height: "1.5rem" }}
            />
            {option.idolGroupName}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            placeholder="선택하세요"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <React.Fragment>
                  {value && (
                    <Avatar
                      sx={{ ml: 1, width: "1.5rem", height: "1.5rem" }}
                      src={
                        groupItems.find(
                          (option) =>
                            option.idolGroupName === value.idolGroupName
                        )?.avatarSrc
                      }
                    />
                  )}
                  {params.InputProps.startAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default GroupDropdown2;
