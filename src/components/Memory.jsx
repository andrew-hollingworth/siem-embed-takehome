import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Memory = (props) => {
  const availableMem =
    100 - (Number(props.freeMem / props.totalMem) * 100).toFixed(2);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {availableMem ? (
          <>
            <Typography variant="h6">Available Memory</Typography>
            <Typography variant="h3" component="div">
              {availableMem}%
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h7">Retreiving Available Memory</Typography>
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

export default Memory;
