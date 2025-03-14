import React, { useState } from "react";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

const EventId = (props) => {
  const [x, setX] = useState(null);
  let range = props.range;
  let cpu = props.cpu;
  let time = props.time;
  let highlightedItem = props.highLightedItem;
  if (highlightedItem) {
    let x = highlightedItem;
    return <ChartsReferenceLine x={x} />;
  }
};

export default EventId;
