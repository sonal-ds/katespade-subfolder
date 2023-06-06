import { AddressType } from "@yext/pages/components";
import { IntervalType } from "./Types";
  
  interface CityCoordinate {
    latitude: number;
    longitude: number;
  }
  
  interface DirectoryParent {
    entityId: string;
    name: string;
  }
  
  export interface LocationData {
    id: string;
    type: string;
    geomodifier: string;
    savedFilters: string[];
    address: AddressType;
    hours: {
      monday: { openIntervals: IntervalType[] };
      tuesday: { openIntervals: IntervalType[] };
      wednesday: { openIntervals: IntervalType[] };
      thursday: { openIntervals: IntervalType[] };
      friday: { openIntervals: IntervalType[] };
      saturday: { openIntervals: IntervalType[] };
      sunday: { openIntervals: IntervalType[] };
    };
    name: string;
    cityCoordinate: CityCoordinate;
    closed: boolean;
    c_brand: string;
    c_coachLocatorFiltersServices: string[];
    dm_directoryParents: DirectoryParent[];
    c_exemptFromETL: boolean;
    c_faxCountryCode: string;
    c_kateSpadeLocatorFiltersServices: string[];
    c_locatorFiltersStoreType: string;
    c_pagemetatitle: string;
    c_outlet: boolean;
    c_pageKateSpade: boolean;
    c_pageMetadescription: string;
    c_whatsAppPhone: string;
    emails: string[];
    geocodedCoordinate: CityCoordinate;
    isoRegionCode: string;
    mainPhone: string;
    timezone: string;
    yextDisplayCoordinate: CityCoordinate;
    timeZoneUtcOffset: string;
    uid: string;
    distance? : number
  }
  
  
  export interface LocationResult {
    data: LocationData;
    distance: number;
    c_locatorFiltersStoreType: string;
  }
  