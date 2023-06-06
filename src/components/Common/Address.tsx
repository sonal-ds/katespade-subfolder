/**
 * This is an Address Component
 * @param props
 * @returns Html elements of Address Component..
 */
import * as React from "react";
import { svgIcons } from "../../assets/svgs/svgIcon";
import { CustomGoogleAnalytics } from "./CustomGoogleAnalytics";
import { AddressType } from "@yext/pages/components";

interface AddressProps {
  onSearchResult?: boolean;
  miles?: number | null;
  address: AddressType;
}

const Address = (props: AddressProps) => {
  const { address } = props;

  return (
    <div
      className="icon-row"
      onClick={() => {
        CustomGoogleAnalytics({
          event_location: "store information",
          event_action: "address click",
          event_label: address,
          eventpage_location: "store locator",
        });
      }}
    >
      {svgIcons.addressIcon}
      <div className="iconContent">
        <span className="details">{address?.line1}</span> <br />
        {address?.line2 && (
          <span className="">
            {address?.line2} <br />
          </span>
        )}
        <span className="">
          {address?.city}, {address?.postalCode}
        </span>
        <span>
          <span className="show-miles">
            {" "}
            {props.onSearchResult ? props.miles + " mi" : <></>}{" "}
          </span>
        </span>
      </div>
    </div>
  );
};
export default Address;
