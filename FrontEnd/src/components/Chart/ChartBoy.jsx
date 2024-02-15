import { Avatar, Grid } from "@mui/material";

import Img from "../../assets/images/NCT_제노.PNG";

const ChartBoy = (props) => {
  return (
    <Grid container spacing={2} direction="row" id="chart-container">
      <Grid item xs={6} id="rank-1-idol">
        <div className="main-big">1. </div>
        <Avatar id="rank-1-image" src={Img} />
        <div className="main-big">{props.data[0]}</div>
      </Grid>
      <Grid item id="rank-23-idol" xs={6}>
        <div id="rank-2-idol">
          <div>2. </div>
          <Avatar className="rank-23-image" src={Img} />
          <div>{props.data[1]}</div>
        </div>
        <div id="rank-3-idol">
          <div>3. </div>
          <Avatar className="rank-23-image" src={Img} />
          <div>{props.data[2]}</div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ChartBoy;
