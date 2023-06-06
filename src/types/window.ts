interface DataLayerPage {
  bread_crumbs: string;
  page_alert: string;
  page_brand: string;
  page_language: string;
  page_name: string;
  page_region: string;
  page_title: string;
  page_type: string;
  referrer: string;
}

interface DataLayerSession {
  environment: string;
  platform: string;
  version: string;
}

export interface DataLayerEvent {
  event: string;
  page: DataLayerPage;
  session: DataLayerSession;
}
