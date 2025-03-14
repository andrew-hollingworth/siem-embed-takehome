import React, { useState, useEffect } from "react";
import EventTimeline from "./components/Timeline";
import CpuGraph from "./components/CpuGraph";
import HostInfo from "./components/HostInfo";
import Memory from "./components/Memory";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#b973ff",
    },
    secondary: {
      main: "#579edd",
    },
    background: {
      default: "#1d1c1f",
      paper: "#1d1c1f",
    },
    text: {
      primary: "rgba(255,255,255,0.76)",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const App = () => {
  // Incomplete data highlighting feature
  // const [highlightedItem, setHighlightedItem] = useState(null);
  // const [anchor, setAnchor] = useState(null);
  const [cpu, setCpu] = useState([0]);
  const [time, setTime] = useState([Date.now()]);
  const [osData, setOsData] = useState({
    arch: "",
    freeMem: 0,
    totalMem: 0,
    hostname: "",
    platform: "",
  });

  const handleOsImport = (data) => {
    const dataOs = {};
    for (const [key, value] of Object.entries(data)) {
      const validKeys = ["arch", "platform", "hostname", "freeMem", "totalMem"];
      validKeys.indexOf(key) >= 0 ? (dataOs[key] = value) : null;
    }
    setOsData(dataOs);
  };

  useEffect(() => {
    const cpuAvg = (cpus, loadavg) => {
      let value = loadavg / cpus;
      return value;
    };
    const setCpuModule = (newCpu) => {
      setCpu([...cpu, newCpu]);
    };
    const setTimeModule = (newTime) => {
      setTime([...time, newTime]);
    };
    // Get the data from the node server because os module doesn't run in browser
    const getServer = async () => {
      let resp = await fetch("http://localhost:3001/os-info");
      let data = await resp.json();
      let value = cpuAvg(data.cpulength, data.loadavg[0]);
      setCpuModule(value);
      handleOsImport(data);
    };

    //Get data every 10 seconds
    const interval = setInterval(() => {
      setTimeModule(Date.now());
      getServer();
    }, 10000);
    return () => clearInterval(interval);
  }, [cpu, time]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }} height="90vh" width="90vw">
        <Grid
          container
          direction="row"
          height="90vh"
          width="90vw"
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <Stack spacing={2} height="80vh" width="40vw">
            <HostInfo
              hostname={osData.hostname}
              platform={osData.platform}
              arch={osData.arch}
            />
            <Memory freeMem={osData.freeMem} totalMem={osData.totalMem} />
            <Paper height="60vh" elevation={3} size={5}>
              <CpuGraph
                cpu={cpu}
                time={time}
                // anchor={anchor}
                // setAnchor={setAnchor}
                // highlightedItem={highlightedItem}
                // setHighlightedItem={setHighlightedItem}
              />
            </Paper>
          </Stack>
          <Grid size={5} height="80vh" width="40vw" spacing={2}>
            <Box sx={{ height: "80vh" }}>
              <Paper elevation={3} sx={{ height: "100%", overflow: "auto" }}>
                <br></br>
                <Box>
                  <Typography variant="h4">
                    CPU Breach and Recovery Events:
                  </Typography>
                </Box>
                <Box>
                  <Box sx={{ overflow: "auto" }}>
                    <EventTimeline
                      // anchor={anchor}
                      // setAnchor={setAnchor}
                      // highlightedItem={highlightedItem}
                      // setHighlightedItem={setHighlightedItem}
                      cpu={cpu}
                      time={time}
                    />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
