import * as React from "react";
import { svgIcons } from "../../assets/svgs/svgIcon";
import Address from "../../components/Common/Address";
import Phone from "../../components/Common/phone";
import {
  CustomGoogleAnalytics,
  defaultTimeZone,
} from "../../components/Common/CustomGoogleAnalytics";
import Hours from "../Common/hours";
import { withTranslation } from "react-i18next";
import "../../types/i18n";
import { IMAGES } from "../../types/Constants";
import { HoursType } from "../../types/Types";
import { AddressType, Coordinate } from "@yext/pages/components";

type LocationInformationProps = {
  prop: HoursType;
  coords: Coordinate;
  address: AddressType;
  phone: string;
  timezone: string;
  hours: HoursType;
  additionalHoursText: string;
  text: string;
  call: string;
  email: string;
  c_whatsAppPhone: string;
};
interface HolidayHour {
  date: string;
}
const LocationInformation = (data: LocationInformationProps) => {
  function openModal() {
    document.body.classList.add("overflow-hidden");
  }

  const [timezone, setTimeZone] = React.useState("");
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    const array: HolidayHour[] = [];
    const currentDate = new Date();
    data?.prop?.holidayHours &&
      data?.prop?.holidayHours.map((i: HolidayHour) => {
        const holidayDate = new Date(`${i.date}`);
        if (holidayDate.getTime() >= currentDate.getTime()) {
          array.push(i);
        }
      });
    if (array.length > 0) {
      setIsShow(true);
    }

    setTimeZone(data.timezone);
  }, []);

  return (
    <>
      <div className="location-detail-sec">
        <div className="container">
          <div className="boxes">
            <div className="box store-info">
              <div className="inner-box">
                <h4 className="box-title">Address</h4>
                <Address address={data.address}></Address>
              </div>
            </div>

            {data?.prop ? (
              <>
                {Object.keys(data?.hours).length > 0 ? (
                  <>
                    <>
                      <div className="box store-timing">
                        <div className="inner-box">
                          <h4 className="box-title">Store Hours</h4>
                          <div className="daylist">
                            <Hours
                              hours={data.hours}
                              timezone={timezone ? timezone : defaultTimeZone}
                              additionalHoursText={data.additionalHoursText}
                            />
                            {data?.prop?.holidayHours &&
                              isShow &&
                              !data?.prop?.reopenDate && (
                                <>
                                  <button
                                    className="absolute -top-1.5 right-[38%] text-sm font-secondry"
                                    onClick={openModal}
                                  >
                                    Holiday Hours
                                  </button>
                                </>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <div className="Core-ctaColum">
              <Phone phone={data.phone} />
              {data.email && (
                <div className="icon-row emailAddress">
                  {svgIcons.mailIcon}
                  <div className="iconContent">
                    <label>Email</label>
                    <a className="details" href={"mailto:" + data.email}>
                      {data.email}
                    </a>
                  </div>
                </div>
              )}
              {data.c_whatsAppPhone && (
                <div className="WhatsApp icon-row">
                  <a
                    href={"https://wa.me/" + data.c_whatsAppPhone}
                    onClick={() => {
                      CustomGoogleAnalytics({
                        event_location: "store information",
                        event_action: "whatsapp click",
                        event_label: "whatsapp icon",
                        eventpage_location: "store locator",
                      });
                    }}
                  >
                    <img
                      className="whatsappIcon"
                      src={IMAGES.WHATSAPP_LOGO}
                      alt="whatsaap icon"
                    />
                  </a>

                  <div className="iconContent">
                    <label>WhatsApp</label>
                    <a
                      className="details"
                      href={"https://wa.me/" + data.c_whatsAppPhone}
                      onClick={() => {
                        CustomGoogleAnalytics({
                          event_location: "store information",
                          event_action: "whatsapp click",
                          event_label: data.c_whatsAppPhone,
                          eventpage_location: "store locator",
                        });
                      }}
                    >
                      {data.c_whatsAppPhone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withTranslation()(LocationInformation);
