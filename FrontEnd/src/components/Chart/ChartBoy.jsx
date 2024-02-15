import React, { useState, useEffect } from "react";
import { Avatar, Grid, CircularProgress } from "@mui/material";

const ChartBoy = ({ rankBoy }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rankBoy && rankBoy.length > 0) {
      setLoading(false);
    }
  }, [rankBoy]);

  return (
    <div className="chart-align">
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} direction="row" id="chart-container">
          <Grid item xs={6} id="rank-1-idol">
            <div className="main-big">1위</div>
            <Avatar id="rank-1-image" src={rankBoy[0].idolImage} />
            <div className="main-big">{rankBoy[0].idolName}</div>
          </Grid>
          <Grid item id="rank-23-idol" xs={6}>
            <div id="rank-2-idol">
              <div>2위</div>
              <Avatar className="rank-23-image" src={rankBoy[1].idolImage} />
              <div>{rankBoy[1].idolName}</div>
            </div>
            <div id="rank-3-idol">
              <div>3위</div>
              <Avatar className="rank-23-image" src={rankBoy[2].idolImage} />
              <div>{rankBoy[2].idolName}</div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ChartBoy;
