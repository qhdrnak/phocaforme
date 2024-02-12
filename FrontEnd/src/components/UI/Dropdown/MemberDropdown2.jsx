import * as React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import { Box, TextField, Autocomplete } from "@mui/material";

const MemberDropdown2 = ({
  isProfile,
  selectedGroup,
  defaultMember,
  onChange,
}) => {

  const user = useSelector((state) => state.user.user);
  const [value, setValue] = useState(user.defaultMember);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  const [memberItems, setMemberItems] = useState([]);

  useEffect(() => {
    console.log(selectedGroup);
    console.log('change')
    setValue(null);
    onChange(null);

    const fetchData = async () => {
      if (selectedGroup) {
        try {
          const response = await axios.get(
            `https://phocafor.me/api/idol/member/${selectedGroup.idolGroupId}`,
            {
              withCredentials: true,
            }
          );
          setMemberItems(response.data);
    
        } catch (error) {
          console.error("멤버 세팅 오류:", error);
        }
      } else {
        setMemberItems([]);
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
        noOptionsText={selectedGroup ? "해당 멤버가 없습니다" : '그룹을 선택해주세요'}
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
