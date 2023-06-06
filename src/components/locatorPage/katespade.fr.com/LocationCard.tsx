import * as React from "react";
import { useEffect, useState } from "react";
import Hours from "../../Common/hours";
import Address from "../../Common/Address";
import OpenCloseStatus, { HoursType } from "../../Common/OpenCloseStatus";
import Phone from "../../Common/phone";
import { svgIcons } from "../../../assets/svgs/svgIcon";
import whatsapplogo from "../../../assets/images/whatsapplogo.png";
import {
  slugify,
  defaultTimeZone,
  groupLocatorPageHourse,
  
  TEMP_SETTINGS,
  convertMeterToMiles,
  getLocationUrl,
} from "../../../components/config/katespade.fr.com/globalConfig";
import {CustomGoogleAnalytics} from "../../Common/CustomGoogleAnalytics"
import RtfConverter from "@yext/rtf-converter";
import { AddressType, Link } from "@yext/pages/components";

import { useTranslation } from "react-i18next";
import "../../../types/i18n";

interface LocationData {
  hours: HoursType;
  mainPhone: string;
  emails: string[];
  c_notificationBanner: string;
  c_whatsAppPhone: string;
  timezone: string;
  slug: string;
  address: AddressType;
  geomodifier: string;
}

interface HoursData {
  days: string;
  isClosed: boolean;
  message: string;
  open: string;
  close?: string;
}

type Miles = number | null;

const LocationCard = (props: {
  result: { data: LocationData; distance: number };
  onSearchResult: boolean;
}) => {
  const dataToShow = props.result.rawData;
  const { address, hours, mainPhone, emails, c_notificationBanner } =
    props.result.rawData;

  const [timezone, setTimeZone] = React.useState("");
  const [hoursData, setHoursData] = useState([]);
  const [miles, setMiles]: [
    Miles,
    React.Dispatch<React.SetStateAction<Miles>>
  ] = useState<number | null>(null);
  const timeStatus = "";

  /** TODO: WORK IN PROGRESS */
  React.useEffect(() => {
    setTimeZone(dataToShow.timezone);
    const convertedMiles: number = convertMeterToMiles(props.result.distance);
    setMiles(convertedMiles);
  }, []);

  /**
   * Function to convert Date format in dd-mm-yy
   */
  let a: Intl.DateTimeFormatOptions[] | undefined;
  let s: string | undefined;
  let dateNewFormat: string | undefined;
  function join(t: Date, a: Intl.DateTimeFormatOptions[], s: string) {
    function format(m: Intl.DateTimeFormatOptions) {
      const f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  if (hours?.reopenDate) {
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(new Date(hours?.reopenDate), a, " ");
    dateNewFormat = s;
  }
  const { t } = useTranslation();

  useEffect(() => {
    const newData = groupLocatorPageHourse(dataToShow.hours, t);
    setHoursData(newData);
  }, []);
  

  return (
    <>
      <ol className="ResultList">
        {c_notificationBanner ? (
          <p
            className="bgPink"
            dangerouslySetInnerHTML={{
              __html: RtfConverter.toHTML(c_notificationBanner),
            }}
          ></p>
        ) : (
          <></>
        )}
        <li className="ResultList-item ResultList-item--ordered js-location-result is-selected">
          <div className="Teaser--locator Teaser--coach">
            <div className="Teaser-column">
              <h3 className="onhighLight">
                <h1 className="geomodifier-heading">
                  {dataToShow.geomodifier}{" "}
                </h1>
              </h3>
              {TEMP_SETTINGS.HIDE_EXPLORE_LINK || !getLocationUrl(dataToShow) ? (
                <></>
              ) : (
                <a
                  onClick={() => {
                    CustomGoogleAnalytics({
                      event_location: "store information",
                      event_action: "explore this shop",
                      event_label: dataToShow.geomodifier,
                      eventpage_location: "store locator",
                    });
                  }}
                  href={getLocationUrl(dataToShow)}
                >
                  {t("Explore this shope")}
                </a>
              )}
              {dataToShow &&
              dataToShow.hours &&
              Object.keys(dataToShow.hours).length > 0 ? (
                <>
                  <div className="OpenCloseStatus icon-row">
                    <div className="icon"></div>
                    <div>
                      <OpenCloseStatus
                        timezone={timezone ? timezone : defaultTimeZone}
                        hours={hours}
                      />
                      {hours &&
                        hours?.reopenDate &&
                        `The Store will reopen at ${dateNewFormat}`}
                    </div>
                    <div className={timeStatus + " daylist"}>
                      <Hours hours={hours ? hours : {}} />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              <Address
                address={address}
                onSearchResult={props.onSearchResult}
                miles={miles}
              />
            </div>

            <div className="Teaser-column">
              {hoursData ? (
                <>
                  <div className="Heading--sub">{t("store hours")}</div>
                  <div>
                    <table>
                      <tbody className="font-normal">
                        {hoursData &&
                          hoursData.map((element: HoursData, index: number) => {
                            return (
                              <tr className="currentDay" key={index}>
                                <td className="capitalize text-left pl-1 pr-4 dayName">
                                  <span>
                                    <b className="checked"></b>
                                    {element.days}
                                  </span>
                                </td>
                                <td className="dayTime pr-1">
                                  {element.isClosed ? (
                                    <span className="time-hours">
                                      {element.message}
                                    </span>
                                  ) : (
                                    <span className="time-hours">
                                      <span className="time-open-hours">
                                        {element.open}
                                      </span>
                                      {element.close ? (
                                        <>
                                          <span className="dash"> - </span>
                                          <span className="time-close-hours">
                                            {element.close}
                                          </span>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="extraInfo">
                {mainPhone ? <Phone phone={mainPhone} /> : ""}

                <div className="icon-row">
                  {svgIcons.mailIcon}
                  <div className="iconContent">
                    <div className="Heading--sub">{t("Email")}</div>
                    <a
                      href={"mailto:" + emails}
                      onClick={() => {
                        CustomGoogleAnalytics({
                          event_location: "store information",
                          event_action: "email click",
                          event_label: dataToShow.emails,
                          eventpage_location: "store locator",
                        });
                      }}
                    >
                      {emails}
                    </a>
                  </div>
                </div>
                {dataToShow.c_whatsAppPhone && (
                  <div className="WhatsApp icon-row">
                    <Link
                      href={"https://wa.me/" + dataToShow.c_whatsAppPhone}
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
                        src={whatsapplogo}
                        alt="whatsaap icon"
                      />
                    </Link>
                    <div className="iconContent">
                      <div className="Heading--sub">{t("WhatsApp")}</div>
                      <a
                        className="details onhighLight"
                        href={"https://wa.me/" + dataToShow.c_whatsAppPhone}
                        onClick={() => {
                          CustomGoogleAnalytics({
                            event_location: "store information",
                            event_action: "whatsapp click",
                            event_label: dataToShow.c_whatsAppPhone,
                            eventpage_location: "store locator",
                          });
                        }}
                      >
                        {dataToShow.c_whatsAppPhone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </li>
        <hr></hr>
      </ol>
    </>
  );
};

export default LocationCard;
