import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Box, TextField, Autocomplete } from "@mui/material";

const MemberDropdown2 = ({
  isProfile,
  selectedGroup,
  defaultMember,
  onChange,
}) => {
  const [value, setValue] = useState(defaultMember);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  const [memberItems, setMemberItems] = useState([]);

  useEffect(() => {
    setValue(null);
    onChange(null);

    const fetchData = async () => {
      if (selectedGroup) {
        try {
          const response = await axios.get(
            `http://localhost:8080/user/idol/member/${selectedGroup}`,
            {
              withCredentials: true,
            }
          );
          setMemberItems(response.data);
        } catch (error) {
          console.error("멤버 세팅 오류:", error);
        }
      }
    };

    fetchData();
  }, [selectedGroup]);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        size="small"
        disablePortal
        id="group-dropdown"
        options={memberItems}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.idolName}
        sx={{
          width: isProfile ? "12rem" : "38vw",

          "& .MuiInputBase-root": {
            borderRadius: "10px",
          },
        }}
        noOptionsText="해당 멤버가 없습니다"
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.idolName}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder="선택하세요" />
        )}
      />
    </div>
  );
};

export default MemberDropdown2;
