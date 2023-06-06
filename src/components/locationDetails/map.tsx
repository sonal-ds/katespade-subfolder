import * as React from "react";
import CustomMap from "./CustomMap";
import { Coordinate } from "@yext/pages/components";
import { HoursType } from "../Common/OpenCloseStatus";


type MapProps = {
  prop: string; // Assuming the prop is of type string
  hours?: HoursType; // Assuming the hours prop is an optional object with string values
  coords: Coordinate; // Assuming the coords prop is of type string
};
const Map = (data: MapProps) => {
  return (
    <div className="boxes">
      <div
        className={
          "box map-info " +
          (data.prop && data.hours && Object.keys(data?.hours).length > 0
            ? ""
            : "without-hours")
        }
        style={{ width: "100%" }}
      >
        <div className="inner-box">
          <CustomMap prop={data.coords} />
        </div>
      </div>
    </div>
  );
};

export default Map;
