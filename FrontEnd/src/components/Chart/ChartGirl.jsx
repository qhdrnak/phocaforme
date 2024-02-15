import React, { useState, useEffect } from "react";
import { Avatar, Grid, CircularProgress } from "@mui/material";

const ChartGirl = ({ rankGirl }) => {
  // 로딩 상태를 관리하는 state 추가
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // rankGirl 값이 도착할 때 로딩 상태 변경
    if (rankGirl && rankGirl.length > 0) {
      setLoading(false);
    }
  }, [rankGirl]);

  return (
    <>
      {loading ? (
        // 로딩 중일 때의 UI
        <CircularProgress />
      ) : (
        // 로딩이 완료된 경우의 UI
        <Grid container spacing={2} direction="row" id="chart-container">
          <Grid item xs={6} id="rank-1-idol">
            <div className="main-big">1. </div>
            <Avatar id="rank-1-image" src={rankGirl[0].idolImage} />
            <div className="main-big">{rankGirl[0].idolName}</div>
          </Grid>
          <Grid item id="rank-23-idol" xs={6}>
            <div id="rank-2-idol">
              <div>2. </div>
              <Avatar className="rank-23-image" src={rankGirl[1].idolImage} />
              <div>{rankGirl[1].idolName}</div>
            </div>
            <div id="rank-3-idol">
              <div>3. </div>
              <Avatar className="rank-23-image" src={rankGirl[2].idolImage} />
              <div>{rankGirl[2].idolName}</div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ChartGirl;
