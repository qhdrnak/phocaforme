import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import axios from "axios";

import { Container, Tabs, Tab, Typography, Box } from "@mui/material";

import ChartBoy from "./ChartBoy";
import ChartGirl from "./ChartGirl";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  const now = new Date();
  now.setDate(now.getDate() - 1);

  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  return (
    <div>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
      >
        <p id="chart-time">{formattedDate.toLocaleString()} 기준</p>
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ChartTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 아이돌 search_count 로 정렬해서 상위 3개 가져오기
  // 하루에 한 번만
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();

      // 날짜가 변경되었을 때 API 호출
      if (newDate.getDate() !== currentDate.getDate()) {
        setCurrentDate(newDate);

        // API 호출 로직
        axios
          .get("https://api.example.com/data")
          .then((response) => {
            console.log("API called successfully:", response.data);
            // 남돌 반영
            setRankBoy();

            // 여돌 반영
            setRankGirl();
          })
          .catch((error) => {
            console.error("Error calling API:", error);
          });
      }
    }, 60000); // 1분마다 날짜 체크 및 API 호출

    // 컴포넌트가 언마운트될 때 clearInterval을 사용하여 interval 해제
    return () => clearInterval(intervalId);
  }, [currentDate]);

  const [rankBoy, setRankBoy] = useState([]);
  const [rankGirl, setRankGirl] = useState([]);

  return (
    <Container sx={{ width: "100%" }}>
      <h2 className="main-title">오늘의 포포차트 🥇</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="남자아이돌"
            {...a11yProps(0)}
            sx={{ fontWeight: value === 0 ? 600 : 400 }}
          />
          <Tab
            label="여자아이돌"
            {...a11yProps(1)}
            sx={{ fontWeight: value === 1 ? 600 : 400 }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ChartBoy data={rankBoy} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChartGirl data={rankGirl} />
      </CustomTabPanel>
    </Container>
  );
};
export default ChartTab;
