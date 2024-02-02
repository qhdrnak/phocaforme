import { Avatar, Grid } from "@mui/material";
import Img from "../../assets/images/아이브_원영.PNG";

const ChartGirl = (props) => {
  return (
    <div>
      <Grid container spacing={2} direction="row" id="chart-container">
        <Grid item xs={6} id="rank-1-idol">
          <div className="main-big">1.</div>
          <Avatar id="rank-1-image" src={Img} />
          <div className="main-big">{props.data[0]}</div>
        </Grid>
        <Grid item id="rank-23-idol" xs={6}>
          <div id="rank-2-idol">
            <p>2. </p>
            <Avatar className="rank-23-image" src={Img} />
            <p>{props.data[1]}</p>
          </div>
          <div id="rank-3-idol">
            <p>3. </p>
            <Avatar className="rank-23-image" src={Img} />
            <p>{props.data[2]}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartGirl;
