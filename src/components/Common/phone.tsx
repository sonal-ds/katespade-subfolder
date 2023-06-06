import * as React from "react";
import { svgIcons } from "../../assets/svgs/svgIcon";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { CustomGoogleAnalytics } from "./CustomGoogleAnalytics";
import { Link } from "@yext/pages/components";

const Phone = (props: { phone: string }) => {
  const { phone } = props;
  const formattedPhone = formatPhoneNumberIntl(phone);
  return (
    <>
      {phone && (
        <div className="location-phone icon-row">
          <span className="onhighLight">{svgIcons.phone}</span>
          <div className="iconContent">
            <label> CALL</label>
            <Link
              className="phone-number onhighLight"
              href={`tel:${phone}`}
              rel="noopener noreferrer"
              onClick={() => {
                CustomGoogleAnalytics({
                  event_location: "store information",
                  event_action: "explore this shop",
                  event_label: "address",
                  eventpage_location: "store locator",
                });
              }}
            >
              {formattedPhone}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default Phone;
