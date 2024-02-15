import React, { useState, useEffect } from "react";
import { Avatar, Grid, CircularProgress } from "@mui/material";

const ChartGirl = ({ rankGirl }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rankGirl && rankGirl.length > 0) {
      setLoading(false);
    }
  }, [rankGirl]);

  return (
    <div className="chart-align">
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} direction="row" id="chart-container">
          <Grid item xs={6} id="rank-1-idol">
            <div className="main-big">1위</div>
            <Avatar id="rank-1-image" src={rankGirl[0].idolImage} />
            <div className="main-big">{rankGirl[0].idolName}</div>
          </Grid>
          <Grid item id="rank-23-idol" xs={6}>
            <div id="rank-2-idol">
              <div>2위</div>
              <Avatar className="rank-23-image" src={rankGirl[1].idolImage} />
              <div>{rankGirl[1].idolName}</div>
            </div>
            <div id="rank-3-idol">
              <div>3위</div>
              <Avatar className="rank-23-image" src={rankGirl[2].idolImage} />
              <div>{rankGirl[2].idolName}</div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ChartGirl;
