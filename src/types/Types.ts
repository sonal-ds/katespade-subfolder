import { AddressType } from "@yext/pages/components";

  interface DataLayerEvent {
      event: string;
      page: {
        bread_crumbs: string;
        page_alert: undefined;
        page_brand: string;
        page_language: string;
        page_name: string;
        page_region: string;
        page_title: string;
        page_type: string;
        referrer: string;
      };
      session: {
        environment: string;
        platform: string;
        version: string;
      };
      shop: Record<string, null>;
      user: Record<string, null>;
  }

  export interface Window {
      dataLayer?: DataLayerEvent[];
  }

  export type HeaderLink = {
      link: string;
      label: string;
      c_storeLocatorLabel: string
  };

  export type Links = {
      link: string;
      label: string;
  };

  export type footerLinks ={
      sectionHeader:string; 
      links:Links[]
  }

  export interface Entity {
    meta: {
      entityType: {
        id: string;
      };
    };
    dm_directoryChildren?: Entity[];
    dm_baseEntityCount: number;
    slug?: string;
    name:string;
    address: AddressType;
    id: string;
  }

  export type DocumentType = {
    name: string;
    _site: {
      c_headerLinks: HeaderLink[];
      c_findAPharmacy: { link: string; label: string };
      c_heroImage: {
        url: string;
      };
      c_locatorPlaceholderText: string;
      c_locatorInstructionalText: string;
      c_footerBottomLinks: Links[];
      c_footerLinks: footerLinks[];
      c_facebook: string;
      c_instagram: string;
      c_twitter: string;
      c_youTube: string;
      c_pinterest: string;
      c_copyrightText:string;
      c_storeLocatorLabel: string;
    };
    dm_directoryChildren?: Entity[];
    address: AddressType;
    dm_directoryParents: Entity[];
    dm_baseEntityCount: number;
    Coach_addressCountryDisplayName:string;
    
  };
  export interface IntervalType {
    start: string;
    end: string;
  }
  export interface DayType {
    isClosed: boolean;
    openIntervals: IntervalType[];
  }
  export interface WeekType {
    monday?: DayType;
    tuesday?: DayType;
    wednesday?: DayType;
    thursday?: DayType;
    friday?: DayType;
    saturday?: DayType;
    sunday?: DayType;
  }
  export interface HolidayType {
    date: string;
    isClosed?: boolean;
    openIntervals: IntervalType[];
  }
  export interface HoursType extends WeekType {
    openIntervals?:IntervalType[]
    holidayHours?: HolidayType[];
    reopenDate?: string;
  }
  export interface QueryData {
    experienceKey?: string;
    version?: string;
    locale?: string;
    input?: string;
    location?: string;
    verticalKey?: string;
    limit?: number;
    offset?: number;
    retrieveFacets?: boolean;
    skipSpellCheck?: boolean;
    session_id?: string;
    sessionTrackingEnabled?: boolean;
    sortBys?: string|number|boolean|undefined; 
    source?: string;
    api_key?: string;
    v?: number;
    filters: string;
    facetFilters: string
    // Include other properties if necessary
  }
  export type DataItem = {
    data: DataItem;
    c_locatorFiltersStoreType: string;
    // Add other properties of the data item if available
  };
  export type GroupedDataItem = {
    type: string;
    count: number;
    child: DataItem[];
    sizeOf?:number;
    showName?:string;
  };
 export type GroupedData = {
    [key: string]: DataItem[];
  };

  export interface Parent {
    id: string;
    name: string;
    slug?: string;
    dm_baseEntityCount: number;
    meta: {
      entityType: {
        id: string;
      };
    };
  }


  export interface Crumb {
    name: string;
    slug: string;
    childrenCount: number;
  }


export interface FilterItem {
  displayName: string;
  count: number;
  selected: boolean;
  filter: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export interface FilterData {
  fieldId: string,
  displayName: string,
  options: FilterItem[]
}