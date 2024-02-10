 
// 게시물 생성용
import * as React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Avatar, TextField, Autocomplete } from "@mui/material";

import logo1 from "../../../assets/images/logo_nct.png";
import logo2 from "../../../assets/images/logo_shinee.jpg";

const GroupDropdown = ({ isProfile, defaultGroup, onChange }) => {
  
  const [groupItems, setGroupItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://phocafor.me/api/idol/group",
          {
            withCredentials: true,
          }
        );
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
        getOptionLabel={(option) => option.idolGroupNameKr}
        // isOptionEqualToValue={(option) => option.idolGroupNameKr}
        sx={{ width: "12rem" }}
        // 검색이랑 모양 똑같이 할거면 스타일 밑에걸로 
        // sx={{
        //   width: isProfile ? "12rem" : "80vw",
        //   "& .MuiInputBase-root": { borderRadius: "10px" },
        // }}
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
            {option.idolGroupNameKr}
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
                            option.idolGroupNameKr === value.idolGroupNameKr
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

export default GroupDropdown;