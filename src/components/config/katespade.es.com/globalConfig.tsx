import { useTranslation } from "react-i18next";
import * as React from "react";
import { DataItem, HoursType, QueryData } from "../../../types/Types";
import { AddressType } from "@yext/pages/components";
import { isProduction } from "@yext/pages/util";
import { provideHeadless } from "@yext/search-headless-react";
import {convert24To12} from "../../Common/HoursConverter"

export const SEARCH_PATH = "search";
export const LOCATOR_STATIC_FILTER_FIELD = "builtin.location";
export const LOCATOR_ENTITY_TYPE = "location";
export const GEOLOCATE_RADIUS = 50;
export const limit = 50; // Integer between 0 to 50
export const radius = 500;
export const defaultQuery = "";
export const baseApiUrl = "https://liveapi.yext.com/v2/accounts/me";
export const liveAPIKey = "686530ce2f733b3d3b1b6d16012cc435";
export const googleMapsApiKey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
export const savedFilterId = "1318835326";
export const entityTypes = "location";

export const StagingUrl = "https://katespadees-plum--fierce--viper-pgsdemo-com.preview.pagescdn.com";
export const ProductionUrl = "https://es.katespade.eu.pagescdn.com";
export const BaseUrl = ProductionUrl;

export const author = "Kate Spade";

export const loadMoreBtnText = "Load more";
export const getNoResultMessage = (address?: string) => {
  return (
    <>
    Sorry, there are no stores in your {address ? `near ${address}` : ''} but shop our great styles online or check out our
    <span> </span>
     <a href="/index.html">other stores across Europe!</a>
    </>
    )};

export const TEMP_SETTINGS = {
  HIDE_EXPLORE_LINK: false,
  DEFAULT_REDIRECT: "index.html",
  LOCATOR_PAGE_URL: BaseUrl + "/store-locator",
  LOCATOR_PAGE_PATH: "/store-locator",

  URL: "https://www.katespade.eu/es",

  GOOGLE_SEARCH_BOUND_COUNTRIES: 'ES',
};
export const googleMapsConfig = {
  centerLatitude: 39.113014,
  centerLongitude: -105.358887,
  googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18",
};

/**
 * CODE EXPLAIN FOR slugify
 * This function takes a string and returns a URL-friendly slug by performing the following operations:
 */
export function slugify(slugString: string | number) {
  return slugString
    .toString()
    ?.toLowerCase()
    .replace(/[&/\\#^+()$~%'":*?<>{}!@]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/'/g, "");
} // ENDOF slugify

export const defaultTimeZone = "Europe/London";
export const AnalyticsEnableDebugging = true;
export const AnalyticsEnableTrackingCookie = true;
export const isProd = () => {
  return isProduction(ProductionUrl); //TODO: once this site is live make sure we check for both reverse proxy and prod URL here
}

export const AnswerExperienceConfig = {
  appName: "Kate spade",
  countryName: "Spain",
  countrySlug: slugify("es"),
  language: "en_ES",
  experienceKey: "kate-spade-es",
  locale: "en_ES",
  apiKey: "b7318cda413fa6f985c0770ffb411bbd",
  verticalKey: "locations",
  session_id: "12727528-aa0b-4558-9d58-12a815eb3761",
  experienceVersion: isProduction(ProductionUrl) ? "PRODUCTION" : "STAGING",
  sessionTrackingEnabled: true,
  endpoints: {
    universalSearch: "https://liveapi.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      "https://liveapi.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      "https://liveapi.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete:
      "https://liveapi.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      "https://liveapi.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      "https://liveapi.yext.com/v2/accounts/me/answers/filtersearch",
  },
};

export const getSearchProvider = () => {
  return provideHeadless({
      apiKey: AnswerExperienceConfig.apiKey,
      experienceKey: AnswerExperienceConfig.experienceKey,
      locale: AnswerExperienceConfig.locale,
      verticalKey: AnswerExperienceConfig.verticalKey,
      experienceVersion: AnswerExperienceConfig.experienceVersion,
  });
}

export const groupLocatorPageHourse = (hours: HoursType[], t:(key: string) => string) => {
  const daysArray = [];
  for (const days in hours) {
    const element = hours[days];
    if (element && element.openIntervals) {
      daysArray.push({
        dayOfWeek: t(days),
        open: convert24To12(element.openIntervals[0].start),
        close: convert24To12(element.openIntervals[0].end),
        isClosed: false,
        message: "",
        isHoliday: false,
      });
    } else if (
      Array.isArray(element) &&
      element &&
      element.length &&
      typeof element[0] !== "undefined" &&
      element[0].date
    ) {
      const holidayItems = element.map((item) => {
        return item.date;
      });
      daysArray.push({
        dayOfWeek: useTranslation(days),
        open: holidayItems && holidayItems[0] ? holidayItems[0] : "00.00",
        close: holidayItems && holidayItems[1] ? holidayItems[1] : "",
        isClosed: false,
        message: t("closed"),
        isHoliday: holidayItems.length,
      });
    } else {
      daysArray.push({
        dayOfWeek: t(days),
        open: "00.00",
        close: "00.00",
        isClosed: true,
        message: t("closed"),
        isHoliday: false,
      });
    }
  }

  interface DayData {
    days?: string;
    open: string;
    close: string;
    isClosed: boolean;
    message: string;
    isHoliday: number | boolean;
  }

  let result = daysArray.reduce(
    (
      element: DayData[],
      { dayOfWeek, open, close, isClosed, message, isHoliday }
    ) => {
      if (
        !element.length ||
        element[element.length - 1].open !== open ||
        element[element.length - 1].close !== close
      ) {
        element.push({
          days: typeof dayOfWeek ==='string' ? dayOfWeek : "" ,
          open,
          close,
          isClosed,
          message,
          isHoliday,
        });
      } else {
        if(dayOfWeek === 'string'){
          element[element.length - 1].days = element[element.length - 1].days ? element[element.length - 1].days : ""
            .split("-")
            .slice(0, 1)
            .concat(dayOfWeek)
            .join(" - ");
          }
      }
      return element;
    },
    []
  );
  if (result.length === 1) {
    result = [
      {
        days: t("All Week"),
        open: result[0].open,
        close: result[0].close,
        isClosed: result[0].isClosed,
        message: t("Closed All Week"),
        isHoliday: false,
      },
    ];
  }
  return result;
};




export interface GroupedDataItem {
  type: string;
  count: number;
  child: DataItem[];
  sizeOf: number;
  showName: string;
}

/**
 * CODE EXPLAIN:- meters to miles converter
 * This function is use to get distance in Miles between two lat and lng
 */
export const convertMeterToMiles = (meters: number) => {
  return parseInt((meters * 0.000621).toString());
}; // endof meters to miles converter

export const groupResults = (data?: any[]) => {
  const results : any = {}
  if (data) {
      data.forEach((x : any) => {
          const groupName :string = x.rawData?.c_locatorFiltersStoreType ? `${x.rawData.c_locatorFiltersStoreType}` : "Retail";
          if (results[groupName]) {
              results[groupName].push(x)
          } else {
              results[groupName] = [x]
          }
      })
  }
  return results;
}

const countryUrlByCountryCode = (code: string) => {
  const countryCodeToCountry = {
    "GB": "uk.katespade.co.uk.pagescdn.com",
    "ES": "es.katespade.eu.pagescdn.com",
    "IT": "it.katespade.eu.pagescdn.com",
    "IE": "ie.katespade.eu.pagescdn.com",
    "BE": "be.katespade.eu.pagescdn.com",
    "FR": "fr.katespade.eu.pagescdn.com",
    "NL": "nl.katespade.eu.pagescdn.com",
    "DE": "de.katespade.de.pagescdn.com"

  }
  return countryCodeToCountry[code]
}

export const getLocationUrl = (data: any) => {
  if (!countryUrlByCountryCode(data.address.countryCode)) {
    return ""; //no URL for countries that don't have pages
  }
  let url = data.address.countryCode == "ES" ? "" : `https://${countryUrlByCountryCode(data.address.countryCode)}/` //absolute URLs for countries outside of ES domain
  if (data.slug) {
    url += `${data.slug.toString()}.html`
  } else {
    const crumbs = [data.address.countryCode.toLowerCase(), data.address.city, data.address.line1]
    url += crumbs.map((x) => slugify(x)).join("/") + ".html"
  }
  return url;
}
