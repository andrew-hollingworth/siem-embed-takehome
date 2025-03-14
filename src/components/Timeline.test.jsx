import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EventTimeline from "./Timeline";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

// Inelegant, but this is raw data to replicate the behavior
const breachCpu = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
const recoverCpu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
const timeArray = [
  1741815883, 1741815883, 1741815883, 1741815883, 174181588, 1741815883,
  1741815883, 1741815883, 1741815883, 1741815883, 1741815883, 1741815883,
  1741815983, 1741815883, 1741815883,
];
const timeArray2 = [
  1741915883, 1741915883, 1741915883, 1741915883, 1741915883, 1741915883,
  1741915883, 1741915883, 1741915883, 1741915883, 1741915883, 1741915883,
  1741915883, 1741915883, 1741915883,
];

describe("Timeline", () => {
  it("renders the timeline scaffolding, empty", async () => {
    render(<EventTimeline anchor={null} setAnchor={null} cpu={[]} time={[]} />);
    // We should see the timeline wrapper, but no items.
    expect(screen.getByTestId("timeline")).toBeInTheDocument();
    expect(screen.queryByTestId("timelineitem")).not.toBeInTheDocument();
  });

  it("renders the timeline with the first breach", async () => {
    render(
      <EventTimeline
        anchor={null}
        setAnchor={null}
        cpu={breachCpu}
        time={timeArray}
      />
    );
    // We should see a timeline item, confirm it contains 'alert', and no connector
    waitFor(() => {
      expect(screen.getByTestId("timelineitem")).toBeInTheDocument();
      expect(screen.getByText(/alert/i)).toBeInTheDocument();
      expect(screen.queryByTestId("timelineconnector")).not.toBeInTheDocument();
    });
  });

  it("renders the timeline with the first breach and then recovery", async () => {
    let newCpu = breachCpu.concat(recoverCpu);
    let newTime = timeArray.concat(timeArray2);
    render(
      <EventTimeline
        anchor={null}
        setAnchor={null}
        cpu={newCpu}
        time={newTime}
      />
    );
    // We should see the recovery message, and a connector now that we have 2 items
    waitFor(() => {
      expect(screen.getByText(/recovered/i)).toBeInTheDocument();
      expect(screen.getByTestId("timelineconnector")).toBeInTheDocument();
    });
  });
});
