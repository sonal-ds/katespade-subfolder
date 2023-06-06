import { AddressType } from "@yext/pages/components";

interface CustomGoogleAnalyticsProps {
    event?:string
    event_location: string, 
    event_action: string, 
    event_label: AddressType | string | string[], 
    eventpage_location:string
  }
  
  interface CustomWindow extends Window {
    dataLayer?: CustomGoogleAnalyticsProps[];
  }
  
  export const CustomGoogleAnalytics = (props: CustomGoogleAnalyticsProps) => {
    if (typeof window !== "undefined" && window) {
      const { event_location, event_action, event_label, eventpage_location } =
        props;
  
        const globalWindow: CustomWindow = window;
        globalWindow.dataLayer = globalWindow.dataLayer || [];
        globalWindow.dataLayer.push({
          event: "store_locator_interaction",
          event_location: event_location,
          eventpage_location: eventpage_location,
          event_action: event_action,
          event_label: event_label,
        });
    }
  };
  
  export const defaultTimeZone = "Europe/London";
  export function slugify(slugString: string | number) {
    return slugString
      .toString()
      ?.toLowerCase()
      .replace(/[&/\\#^+()$~%'":*?<>{}!@]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/'/g, "");
  } // ENDOF slugify