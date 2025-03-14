import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const HostInfo = (props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {props.hostname && props.arch && props.platform ? (
          <>
            <Typography variant="h6">Hostname: {props.hostname}</Typography>
            <Typography variant="h7">Arch: {props.arch}</Typography>
            <br></br>
            <Typography variant="h7">Platform: {props.platform}</Typography>
          </>
        ) : (
          <>
            <Typography variant="h7">Retreiving Host info</Typography>
            <br></br>
            <Box sx={{ display: "inline" }}>
              <CircularProgress />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HostInfo;
