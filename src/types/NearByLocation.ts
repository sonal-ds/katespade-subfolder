import { HoursType, Links, Parent } from "./Types";
import { AddressType } from "@yext/pages/components";

    interface Meta {
        uuid: string;
    }

  interface Coordinate {
    latitude: number;
    longitude: number;
  }
  
  export interface NearByData {
    slug?: string,
    distance?: number[]
    id?: string;
    type?: string;
    c_bookAnAppointment?: Links
    c_facilities?: string | undefined
    c_coachUKs?: string | undefined
    c_coachUKsTitle?: string | undefined
    c_getDirections?: string | undefined
    geomodifier?: string;
    savedFilters?: string[];
    address: AddressType;
    hours: HoursType;
    name?: string;
    cityCoordinate?: Coordinate;
    closed?: boolean;
    c_brand?: string;
    c_coachLocatorFiltersServices?: string[];
    dm_directoryParents?: {
      entityId?: string;
      name?: string;
    }[];
    c_exemptFromETL?: boolean;
    c_faxCountryCode?: string;
    c_kateSpadeLocatorFiltersServices?: string[];
    c_locatorFiltersStoreType?: string;
    c_pagemetatitle?: string;
    c_outlet?: boolean;
    c_pageKateSpade?: boolean;
    c_pageMetadescription?: string;
    c_whatsAppPhone?: string;
    emails?: string[];
    mainPhone?: string;
    timezone?: string;
    yextDisplayCoordinate?: Coordinate;
    yextRoutableCoordinate?: Coordinate;
    timeZoneUtcOffset?: string;
    uid?: string;
  }
  
  interface Result {
    data: NearByData;
    distance: number[];
  }
  
  interface Response {
    businessId: number;
    queryId: string;
    resultsCount: number;
    results: Result[];
  }
  
  interface Prop {
    meta: Meta;
    response: Response;
  }
  
  export interface NearByLocationInterface {
    prop: Prop;
    parents: Parent[];
    baseUrl: string;
    coords: Coordinate;
    slug: string;
    timezone: string;
    geomodifier: string;
  }
  