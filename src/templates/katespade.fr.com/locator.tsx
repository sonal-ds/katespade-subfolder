import * as React from "react";
import "../../index.css";
import {
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import Header from "../../components/Layout/katespade.fr.com/header";
import {
  AnswerExperienceConfig,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  googleMapsConfig,
  TEMP_SETTINGS,
  getSearchProvider,
} from "../../components/config/katespade.fr.com/globalConfig";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import Banner from "../../components/locationDetails/LocatorBanner";
import { BaseUrl } from "../../components/config/katespade.fr.com/globalConfig";
import { JsonLd } from "react-schemaorg";
import Footer from "../../components/Layout/footer";
import SearchLayout from "../../components/locatorPage/katespade.fr.com/SearchLayout";
import favicon from "../../assets/images/favicon.avif";
import faviconIcon from "../../assets/images/favicon_ico.ico";
import kateLogo from "../../assets/images/logo.svg";
import favIcon from "../../assets/images/favicon.ico";
import { getRuntime } from "@yext/pages/util";
import { BrowserRouter } from "react-router-dom";
import { IMAGES } from "../../types/Constants";


export const config: TemplateConfig = {
  stream: {
    $id: "locatorSearch",
    filter: {
      entityIds: ["katespade-fr-site-entity"],
    },
    fields: [
      "name",
      "id",
      "uid",
      "meta",
      "c_headerLinks",
      "c_footerBottomLinks",
      "logo",
      "c_storeLocatorLabel",
      "c_footerLinks",
      "c_locatorMetaTitle",
      "c_locatorMetaDescription",
      "c_youTube",
      "c_snapchat",
      "c_twitter",
      "c_facebook",
      "c_instagram",
      "c_pinterest",
      "c_tikTok",
      "c_heroImage",
      "c_locatorTitle",
      "c_locatorInstructionalText",
      "c_locatorPlaceholderText",
      "c_whatsAppPhone",
    ],
    localization: {
      locales: [AnswerExperienceConfig.language],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return `store-locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const metaDescription = document._site.c_locatorMetaDescription
    ? document._site.c_locatorMetaDescription
    : "Find the Kate Spade designer handbags and purses store nearest you. Shop designer bags, wallets, and jewelry in spades.";
  const metaTitle = document._site.c_locatorMetaTitle
    ? document._site.c_locatorMetaTitle
    : "Women’s Handbag Stores Near You | Kate Spade New York";

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
          content: `${metaTitle}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: TEMP_SETTINGS.LOCATOR_PAGE_URL,
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
          content: TEMP_SETTINGS.LOCATOR_PAGE_URL,
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
          content: `${document.logo && document.logo.image && document.logo.image.url ? document.logo.image.url : kateLogo}`,
        },
      },
    ],
    other:
      "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M9GFGLK');</script>",
  };
};

const Locator: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _meta, _site } = document;
  const templateData = { document: document, __meta: _meta };

  const searcher = getSearchProvider();
  const runtime = getRuntime();

  /** CODE EXPLAIN:-  CustomGoogleAnalytics function is use to add google analytics */
  if (typeof window !== "undefined" && window) {
    const metaTitle = document._site.c_locatorMetaTitle
      ? document._site.c_locatorMetaTitle
      : "Coach";
    const breadcrumbString = "All Locations:Find a Location";
    (window as Window).dataLayer = (window as Window).dataLayer || [];
    (window as Window).dataLayer.push({
      event: "dataLayer_initialized",
      page: {
        bread_crumbs: breadcrumbString,
        page_alert: undefined,
        page_brand: AnswerExperienceConfig.appName,
        page_language: document.locale,
        page_name: metaTitle,
        page_region: document.address?.region
          ? document.address.countryCode
          : "UK",
        page_title: metaTitle,
        page_type: "Store locator",
        referrer: document.referrer,
      },
      session: {
        environment: "production",
        platform: "desktop",
        version: "yext",
      },
      shop: {},
      user: {},
    });
  }

  // interface LocatorType extends Thing {
  //   "@type": MotorcycleRepair;
  //   name: string;
  //   url: string;
  //   logo: string;
  // }
  interface Thing {
    name: string;
    description?: string;
  }

  interface LocatorType extends Thing {
    "@type": "ShoppingCenter";
    url: string;
    logo: string;
  }

  return (
    <>
      <JsonLd<LocatorType>
        item={{
          "@context": "https://schema.org",
          "@type": "ShoppingCenter",
          name: "Katespade",
          url: "#",
          logo: kateLogo,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <AnalyticsScopeProvider name="locator_page_view">
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M9GFGLK"
              height="0"
              width="0"
            ></iframe>
          </noscript>

          <Header
            headerLinks={_site.c_headerLinks}
            title={_site.c_storeLocatorLabel}
          />
          <Banner
            locatorTitleH1={_site.c_storeLocatorLabel}
            banner={_site.c_heroImage?.url}
          />
          <SearchHeadlessProvider searcher={searcher} >
            {runtime.name == 'browser' && (
              <BrowserRouter>
                <SearchLayout
                  LocatorInstructionalText={_site.c_locatorInstructionalText}
                  placeholder={_site.c_locatorPlaceholderText}
                />
                <div className="Footer">
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
              </BrowserRouter>
            )}
            </SearchHeadlessProvider>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default Locator;
