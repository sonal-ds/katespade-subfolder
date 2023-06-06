import * as React from "react";

import "@splidejs/react-splide/css";
import { svgIcons } from "../../../assets/svgs/svgIcon";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AddressType, Coordinate, Link } from "@yext/pages/components";
import Address from "../../Common/Address";
import OpenCloseStatus from "../../Common/OpenCloseStatus";
import {
  slugify,
  defaultTimeZone,
  TEMP_SETTINGS,
} from "../../../components/config/katespade.fr.com/globalConfig";
import "../../../types/i18n";
import { HoursType } from "../../../types/Types";
import {NearByLocationInterface } from "../../../types/NearByLocation";



type ResultProps = {
  slug: string;
  address: AddressType;
  geomodifier: string;
  hours: HoursType;
  mainPhone: string;
  name: string;
  yextDisplayCoordinate: Coordinate;
  distance: number[];
  id: string;
  c_bookAnAppointment: { label: string; link: string };
  c_facilities: string;
  c_coachUKs: string;
  c_coachUKsTitle: string;
  c_getDirections: string;
};

export type NearbyProps = {
  response: {
    results: ResultProps[];
    distances:number[]
  };
};


const NearByLocation = (result: NearByLocationInterface) => {

  const { timezone } = result;
  function closeModal() {
    document.body.classList.remove("overflow-hidden");
  }

  

  return (
    <>
      <div className="nearby-sec">
        <div className="container">
          <div className="Nearby-row Nearby-titleRow l-row">
            <h2 className="Nearby-title">Nearby Kate Spade Stores</h2>
            <div
              className="Nearby-linkWrapper--title l-hidden-xs"
              id="store-locator-btn-desktop"
            >
              <Link href={TEMP_SETTINGS.LOCATOR_PAGE_PATH}>Store Locator</Link>
            </div>
          </div>
          <Splide
            // id="splide-nearby"
            options={{
              rewind: false,
              type: "slide",
              perPage: 3,
              perMove: 1,
              arrows: false,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 2,
                  drag: true,
                  pagination: true,
                  arrows: false,
                  type: "splide",
                },
                766.98: {
                  perPage: 1,
                },
              },
            }}
          >
           {result?.prop?.response?.results &&
              result?.prop?.response?.results.map((e, index: number) => {
                if (index > 0) {
                  let url = "";
                  if (!e.data.slug) {
                    const slugString = e?.data?.address.line1;
                    const city = e?.data?.address.city;
                    const country = typeof e?.data?.address.countryCode != "undefined" && e?.data?.address.countryCode ? slugify(e?.data?.address.countryCode) : "fr";
                    url = `/${slugify(country)}/${slugify(city)}/${slugify(slugString)}.html`;
                  } else {
                    url = `/${e?.data.slug.toString()}`;
                  }
                  return (
                    <SplideSlide key={index}>
                      <div className="location near-location">
                        <div className="miles-with-title">
                          <h3 className="">
                            <a href={url}>{e?.data.geomodifier}</a>
                          </h3>
                        </div>
                        <OpenCloseStatus
                          timezone={timezone ? timezone : defaultTimeZone}
                          hours={e?.data?.hours }
                        ></OpenCloseStatus>

                        <Address address={e?.data.address} />

                        <div className="buttons">
                          <div className="ctaBtn">
                            <Link className="" href={url}>
                              Explore This Shop
                            </Link>
                          </div>

                          {e?.data?.c_bookAnAppointment?.link &&
                            e?.data?.c_bookAnAppointment?.label && (
                              <div className="ctaBtn pt-2.5 mx-auto">
                                <Link
                                  className="onhighLight button before-icon"
                                  href={e?.data?.c_bookAnAppointment.link}
                                >
                                  {svgIcons.BookAnAppointment}
                                  {e?.data?.c_bookAnAppointment.label}
                                </Link>
                              </div>
                            )}
                        </div>
                      </div>
                    </SplideSlide>
                  );
                }
              })}
          </Splide>
          <div className="coach-serv">
            <a onClick={closeModal}> </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default NearByLocation;
