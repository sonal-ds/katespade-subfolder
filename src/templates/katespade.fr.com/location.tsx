import * as React from "react";
import BreadCrumbs from "../../components/katespade.es.com/BreadCrumbs";

import NearByLocation from "../../components/locationDetails/katespade.fr.com/NearByLocation";
import { fetch } from "@yext/pages/util";
import { JsonLd } from "react-schemaorg";
import LocationInformation from "../../components/locationDetails/LocationInformation";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import Header from "../../components/Layout/katespade.fr.com/header";
import Footer from "../../components/Layout/footer";
import About from "../../components/locationDetails/AboutApp";
import {
  AnswerExperienceConfig,
  TEMP_SETTINGS,
  defaultTimeZone,
  savedFilterId,
} from "../../components/config/katespade.fr.com/globalConfig";
import "../../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import {
  BaseUrl,
  slugify,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../../components/config/katespade.fr.com/globalConfig";
import ServicesSections from "../../components/locationDetails/servicessection";
import AboutGuide from "../../components/locationDetails/aboutguide";
import OpenCloseStatus from "../../components/Common/OpenCloseStatus";
import Map from "../../components/locationDetails/map";
import { svgIcons } from "../../assets/svgs/svgIcon";
import RtfConverter from "@yext/rtf-converter";
import favicon from "../../assets/images/favicon.avif";
import faviconIcon from "../../assets/images/favicon_ico.ico";
import kateLogo from "../../assets/images/logo.svg";
import { DataLayerEvent } from "../../types/window";
import { IMAGES } from "../../types/Constants";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "location",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "emails",
      "slug",
      "mainPhone",
      "facebookPageUrl",
      "instagramHandle",
      "twitterHandle",
      "c_storeLocatorLabel",
      "hours",
      "logo",
      "c_pagemetatitle",
      "c_locatorFiltersStoreType ",
      "c_brand",
      "priceRange",
      "geomodifier",
      "fax",
      "c_numberOfRegisters",
      "c_regionManager",
      "c_regionName",
      "c_twilioPhone",
      "c_vM",
      "c_aboutSection",
      "c_heroImage",
      "c_outlet",
      "c_pageMetadescription",
      "c_notificationBanner",
      "c_productsSectionTile1",
      "c_productsSectionTile2",
      "c_productsSectionTile3",
      "c_promoSection",
      "c_whatsAppPhone",
      "yextDisplayCoordinate",
      "geocodedCoordinate",
      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.dm_baseEntityCount",
    ],
    filter: {
      entityTypes: ["location"],
      savedFilterIds: [savedFilterId],
    },
    localization: {
      locales: [AnswerExperienceConfig.locale],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */

/** current detail page url */
export const getPath: GetPath<TemplateProps> = ({ document }) => {

return document.slug
? document.slug

: `${slugify(document.address.countryCode)}/${slugify(document.address.city)}/${slugify(document.address.line1)}.html`;

};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  let url = "";

  if (!document.slug) {
    const results = slugify(document.address.line1);
    const city = slugify(document.address.city);
    const country =
      typeof document.address.localizedCountryName != "undefined" &&
      document.address.localizedCountryName
        ? slugify(document.address.localizedCountryName)
        : slugify(document.address.countryCode);
    url = `${country}/${city}/${results}`;
  } else {
    url = `${document.slug.toString()}`;
  }

  const metaDescription = document.c_pageMetadescription
    ? document.c_pageMetadescription
    : "Visit your local Kate Spade store at"+  document.address.line1 + "in" + document.address.city  + "," +  document.address.countryCode + "to find the perfect bags, wallets, and jewelry in spades";
  const metaTitle = document.c_pagemetatitle
    ? document.c_pagemetatitle
    : "Kate Spade in"+ document.geomodifier +"| Handbag & Purse Stores in " + document.address.city +"," +document.address.countryCode;

  return {
    title: `${metaTitle}`,
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/png",
          href: favicon,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: faviconIcon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Katespade",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document.c_canonical ? document.c_canonical : BaseUrl + `/${url}`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: BaseUrl,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${document.logo ? document.logo.image.url : kateLogo}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: BaseUrl,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${metaDescription}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: `${document.logo ? document.logo.image.url : kateLogo}`,
        },
      },
    ],
    other: `<script src=https://cdn.cookielaw.org/consent/ad984482-c72a-41f0-8bda-4edcd2b1ab55-test/otSDKStub.js  type="text/javascript" charset="UTF-8" data-domain-script="ad984482-c72a-41f0-8bda-4edcd2b1ab55-test" ></script><script type="text/javascript">function OptanonWrapper() { }</script>
    `,
  };
};

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };

export const transformProps: TransformProps<ExternalApiData> = async (data) => {
  const latitude = data?.document?.yextDisplayCoordinate?.latitude;
  const longitude = data?.document?.yextDisplayCoordinate?.longitude;
  const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=${AnswerExperienceConfig.experienceKey}&api_key=${AnswerExperienceConfig.apiKey}&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${latitude},${longitude}&verticalKey=${AnswerExperienceConfig.verticalKey}&limit=4&retrieveFacets=true&skipSpellCheck=false&session_id=${AnswerExperienceConfig.session_id}&sessionTrackingEnabled=${AnswerExperienceConfig.sessionTrackingEnabled}&source=STANDARD`;
  const externalApiData = (await fetch(url).then((res) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};

export type nearByLocation = {
  entities: object;
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  externalApiData,
  document,
  __meta,
}: ExternalApiRenderData) => {
  const {
    _site,
    name,
    address,
    hours,
    geomodifier,
    fax,
    emails,
    dm_directoryParents,
    c_aboutSection,
    c_heroImage,
    c_notificationBanner,
    c_promoSection,
    mainPhone,
    yextDisplayCoordinate,
    timezone,
    c_whatsAppPhone,
  } = document;

  const templateData = { document: document, __meta: __meta };

  interface OpeningHoursSchema {
    "@type": "OpeningHoursSpecification";
    closes?: string;
    dayOfWeek: string;
    opens?: string;
  }

  const hoursSchema = [];
  const breadcrumbScheme = [];
  if (hours) {
    for (const key in hours) {
      if (Object.prototype.hasOwnProperty.call(hours, key)) {
        let openIntervalsSchema: OpeningHoursSchema = {} as OpeningHoursSchema;
        if (key !== "holidayHours") {
          if (hours[key].isClosed) {
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: key,
            };
          } else {
            let end = "";
            let start = "";
            if (typeof hours[key].openIntervals != "undefined") {
              const openIntervals = hours[key].openIntervals;
              for (const o in openIntervals) {
                if (Object.prototype.hasOwnProperty.call(openIntervals, o)) {
                  end = openIntervals[o].end;
                  start = openIntervals[o].start;
                }
              }
            }
            openIntervalsSchema = {
              "@type": "OpeningHoursSpecification",
              closes: end,
              dayOfWeek: key,
              opens: start,
            };
          }
        }

        hoursSchema.push(openIntervalsSchema);
      }
    }
  }

  let url = "";
  if (!document.slug) {
    const slugString = document.id + " " + document.name;
    const slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }
  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": `${BaseUrl}/${url}`,
      name: document.name,
    },
  });

  /** CustomGoogleAnalytics function is use to add google analytics */
  if (typeof window !== "undefined" && window) {
    interface DirectoryParent {
      meta: {
        entityType: {
          id: string;
        };
      };
      name: string;
    }

    const metaTitle = document.c_pagemetatitle
      ? document.c_pagemetatitle
      : "Coach";
    let breadcrumbString = "";
    document.dm_directoryParents &&
      document.dm_directoryParents.map((i: DirectoryParent) => {
        if (i.meta.entityType.id == "Coach_country") {
          breadcrumbString += "All Locations";
        } else if (i.meta.entityType.id == "Coach_region") {
          breadcrumbString += " :" + i.name;
        } else if (i.meta.entityType.id == "Coach_city") {
          breadcrumbString += " :" + i.name;
        }
      });

    if (breadcrumbString) {
      breadcrumbString += " :" + document?.geomodifier;
    }

    interface Window {
      dataLayer?: DataLayerEvent[];
    }
    (window as Window).dataLayer = (window as Window).dataLayer || [];
    (window as Window).dataLayer?.push({
      event: "dataLayer_initialized",
      page: {
        bread_crumbs: breadcrumbString,
        page_alert: "",
        page_brand: AnswerExperienceConfig.appName,
        page_language: document.locale,
        page_name: document?.geomodifier ? document?.geomodifier : metaTitle,
        page_region:
          typeof address.region != "undefined"
            ? address.region
            : address.countryCode,
        page_title: metaTitle,
        page_type: "location",
        referrer: document.referrer,
      },
      session: {
        environment: "production",
        platform: "desktop",
        version: "yext",
      },
    });
  }

  const [notificationData, setNotificationData]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ] = React.useState<string | null>(null);
  React.useEffect(() => {
    setNotificationData(c_notificationBanner);
  }, [c_notificationBanner]);

  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: document?.name,
          image: `${document.logo ? document.logo.image.url : kateLogo}`,
          "@id": "",
          url: "#",
          telephone: mainPhone,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: document?.yextDisplayCoordinate?.latitude,
            longitude: document?.yextDisplayCoordinate?.longitude,
          },
          openingHoursSpecification: hoursSchema,
        }}
      />

      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbScheme,
        }}
      />

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <AnalyticsScopeProvider name="location_page_view">

        <Header
        headerLinks={_site.c_headerLinks}  
        title={_site.c_storeLocatorLabel}      
      />


          <div className="top-breadcrumb" id="top-breadcrumb">
            <BreadCrumbs
              name={geomodifier}
              parents={dm_directoryParents}
              address={address}
            ></BreadCrumbs>
          </div>
          {notificationData ? (
            <p
              className="bgPink"
              dangerouslySetInnerHTML={{
                __html: RtfConverter.toHTML(notificationData),
              }}
            ></p>
          ) : (
            <></>
          )}
          <div className="hero">
          <div className="banner_image_h">
         { c_heroImage ? 
            <img
              className="heroBanner"  
              src={c_heroImage.url}
              alt="Banner Image"
            /> : <div className="heroBanner"></div>
          }

              <div className="hero-content">
                <span className="subTitle">{name.toUpperCase()}</span>
                <h2>{geomodifier}</h2>
                {hours ? (
                  <>
                    <>
                      <div className="single-line">
                        <OpenCloseStatus
                          timezone={timezone ? timezone : defaultTimeZone}
                          hours={hours}
                        ></OpenCloseStatus>
                      </div>
                    </>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <LocationInformation
            prop={hours}
            coords={yextDisplayCoordinate}
            address={address}
            phone={mainPhone}
            timezone={timezone}
            hours={hours}
            c_whatsAppPhone={c_whatsAppPhone}
            additionalHoursText={undefined}
            c_storeNo={undefined}
            c_regionNo={undefined}
            storeInformationHeading={undefined}
            hoursHeading={undefined}
            getDirection={undefined}
            tellUsIfTheseDetailsAreWrong={undefined}
            clickAndCollect={undefined}
            text={fax}
            call={mainPhone}
            email={emails}
          />

          <ServicesSections
            card1={document.c_productsSectionTile1}
            card2={document.c_productsSectionTile2}
            card3={document.c_productsSectionTile3}
          />

          <AboutGuide allStreamData={c_promoSection} />
          <Map
            prop={hours}
            coords={yextDisplayCoordinate}
            hours={hours}
            timezone={timezone}
          />
          <div className="aboutBlock">
            {c_aboutSection ? (
              <About
                storeDescriptionTitle={c_aboutSection}
                title={geomodifier}
              />
            ) : (
              <></>
            )}
          </div>

          <NearByLocation
            prop={externalApiData}
            parents={undefined}
            baseUrl={relativePrefixToRoot}
            coords={yextDisplayCoordinate}
            slug={undefined}
            timezone={timezone}
            geomodifier={geomodifier}
          />

          <div
            className="find-more more-location store-locator-btn"
            id="store-locator-btn"
          >
            <button>
              <Link href={TEMP_SETTINGS.LOCATOR_PAGE_PATH}>
                {svgIcons.ViewMore}Store Locator
              </Link>
            </button>
          </div>

          <div className="bottom-breadcrumb" id="bottom-breadcrumb">
            <BreadCrumbs
              name={geomodifier}
              parents={dm_directoryParents}
              address={address}
            ></BreadCrumbs>
          </div>

          <div className="Footer !border-t-0 !mt-0">
            <Footer
              footerBottomLinks={_site.c_footerBottomLinks}
              footerLinks={_site.c_footerLinks}
              facebook={_site.c_facebook}
              instagram={_site.c_instagram}
              twitter={_site.c_twitter}
              youtube={_site.c_youTube}
              copyrightText={_site.c_copyrightText}
              Pintres={_site.c_pinterest}
            />
          </div>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default Location;
