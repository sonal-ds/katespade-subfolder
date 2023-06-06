import * as React from "react";
import BreadCrumbs from "../../components/katespade.es.com/BreadCrumbs";
import "../../index.css";
import Header from "../../components/Layout/katespade.es.com/header";
import Footer from "../../components/Layout/footer";
import { slugify, BaseUrl, AnswerExperienceConfig, LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE, getSearchProvider, TEMP_SETTINGS } from "../../components/config/katespade.es.com/globalConfig";
import favicon from "../../assets/images/favicon.avif";
import faviconIcon from "../../assets/images/favicon_ico.ico";
import kateLogo from "../../assets/images/logo.svg";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { AddressType } from "@yext/pages/components";
import { FilterSearch } from "@yext/search-ui-react";
import { encodeStaticFilters } from "../../components/locatorPage/katespade.es.com/utils/handleSearchParams";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import GeolocateButton from "../../components/locatorPage/katespade.es.com/GeolocateButton";
import { IMAGES } from "../../types/Constants";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../components/Common/SearchIcon"

interface Entity {
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


export const config: TemplateConfig = {
  stream: {
    $id: "country",
    filter: {
      entityTypes: ["Coach_country"],
      
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "address",
      "dm_baseEntityCount",
      "c_dm_metaTitle",
      "Coach_addressCountryDisplayName",
      "c_dm_metadescription",
      "dm_directoryChildren.name",
      "dm_directoryChildren.id",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.address",
      "dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.meta.entityType",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.address",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.meta.entityType",
      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.address",
      "dm_directoryParents.meta.entityType",
    ],
    localization: {
      locales: ["en_ES"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return "/index" + ".html";
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  const metaDescription = document.c_dm_metadescription
    ? document.c_dm_metadescription
    : "Find the Kate Spade designer handbags and purses store nearest you in "+ document.name  +" | Shop designer bags, wallets, and jewelry in spades";
  const metaTitle = document.c_dm_metaTitle
    ? document.c_dm_metaTitle
    : "Handbag Stores in "+ document.name  +" | Kate Spade New York";

  return {
    title: metaTitle,
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
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${document.c_canonical ? document.c_canonical : BaseUrl}`,
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
          content: `"index";`,
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
    other:
    "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M9GFGLK');</script>",
  };
};

interface countryDataProps extends TemplateRenderProps {
  document: DocumentType;
}

const Country: Template<countryDataProps> = ({
  document,
}: countryDataProps) => {
  const { name, _site } = document;
  const {
    dm_directoryChildren,
    Coach_addressCountryDisplayName,
    address,
    dm_directoryParents,
    dm_baseEntityCount,
  } = document;
  	const Kate_city: Entity[] = [];
  	const searchFields = [
		{
			fieldApiName: LOCATOR_STATIC_FILTER_FIELD,
			entityType: LOCATOR_ENTITY_TYPE,
		},
	];

	const searcher = getSearchProvider();
	const {t} = useTranslation();

  const childrenDivs = dm_directoryChildren
    ? dm_directoryChildren.map((entity: Entity) => {
        let detlslug;

        if (typeof entity.dm_directoryChildren != "undefined") {
          if (entity.meta.entityType.id == "Coach_city") {
            if (entity.dm_baseEntityCount == 1) {
              entity.dm_directoryChildren.map((res: Partial<Entity>) => {
                let detlslug1 = "";
                if (!res.slug ) {
                  const country = AnswerExperienceConfig.countrySlug;
                  const city = slugify(res.address? res.address?.city : "");
                  const slugString = res.address?.line1;
                  const slug = slugify(slugString ? slugString :"");
                  detlslug1 = `${country}/${city}/${slug}.html`;
                } else {
                  detlslug1 = `${res.slug?.toString()}`;
                }

                res.dm_directoryChildren
                  ? res.dm_directoryChildren.map((detl: Partial<Entity>) => {
                      if (!detl.slug) {
                        const slugString = detl.id;
                        const slug = slugify(slugString ? slugString : "");
                        detlslug1 = `${slug}`;
                      } else {
                        detlslug1 = `${detl.slug.toString()}`;
                      }

                      detlslug = detlslug1;
                    })
                  : (detlslug = detlslug1);
              });
            } else {
              detlslug = AnswerExperienceConfig.countrySlug + "/" + entity.slug + "";
            }

            return (
              <li className="storelocation-category">
                <a key={entity.slug} href={BaseUrl + "/" + detlslug}>
                  {entity.name} ({entity.dm_baseEntityCount})
                </a>
              </li>
            );
          } else {
            Kate_city.push(entity);
          }
        }
      })
    : null;

  /***
   * for city when not have region in locations
   *
   */
  const citiesList = Kate_city.map((city: Entity, index: number) => {
    let cityslug = "";

    if (city.dm_baseEntityCount == 1) {
      city.dm_directoryChildren
        ? city.dm_directoryChildren.map((location: Entity) => {
            if (!location.slug) {
              const slugString = location.id + " " + location.name;
              const slug = slugify(slugString);
              cityslug = `${slug}`;
            } else {
              cityslug = `${location.slug.toString()}`;
            }
          })
        : "";
    } else {
      if (!city.slug) {
        const slugString = city.id + " " + city.name;
        const slug = slugify(slugString);
        cityslug = `${slug}`;
      } else {
        cityslug = `${city.slug.toString()}`;
      }
      if (city.meta.entityType.id == "Coach_city") {
        cityslug = AnswerExperienceConfig.countrySlug+" / "+ cityslug;
      }
    }

    return (
      <li key={index} className=" storelocation-category">
        <a key={city.slug} href={BaseUrl + "/" + cityslug}>
          {city.name} ({city.dm_baseEntityCount})
        </a>
      </li>
    );
  });

  return (
    <>
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
          <BreadCrumbs
              name={name}
              parents={dm_directoryParents}
              address={address} 
              ></BreadCrumbs>

      <div className="hero hero-top-banner">
        <img
          className="heroBanner"
          src={_site.c_heroImage.url}
          alt="Banner Image"
        />
        <div className="hero-content">
          <h1 className="small-heading">
            <strong>
              
              {dm_baseEntityCount} Kate Spade Locations
              <br></br> in {Coach_addressCountryDisplayName}
            </strong>
          </h1>
          <SearchHeadlessProvider searcher={searcher}>
            <div className="w-full relative">
              <div className="absolute right-4 top-[85px] -translate-y-1/2 text-brand-primary z-10">
                <SearchIcon />
              </div>
              <FilterSearch
                  customCssClasses={{
                  filterSearchContainer: "dm-page-search-form search-form font-primary w-full",
                  label: "top-text my-0",
                  }}
                  label={document._site.c_locatorInstructionalText}
                  placeholder={document._site.c_locatorPlaceholderText}
                  searchFields={searchFields}
                  key="directory-search"
                  onSelect={({ newDisplayName, newFilter }) => {
                  const searchParams = encodeStaticFilters([
                      {
                      displayName: newDisplayName,
                      filter: newFilter,
                      selected: true,
                      },
                  ]);

                  if (searchParams) {
                      window.location.href = `${TEMP_SETTINGS.LOCATOR_PAGE_URL}?${searchParams.toString()}`;
                  }
                  }}
                />
            </div>
            <GeolocateButton className="use-my-location font-primary text-sm text-black underline capitalize" content={t("use-my-location")} redirectToSearchPage={true} searcherPath={TEMP_SETTINGS.LOCATOR_PAGE_URL} />
          </SearchHeadlessProvider>
        </div>
      </div>

      <div className="content-list">
        <div className="container">
          <ul className="region-list">{childrenDivs}</ul>
          {Kate_city.length > 0 ? (
            <>
              <ul className="city-list region-list"> {citiesList}</ul>
            </>
          ) : (
            ""
          )}
        </div>
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
    </>
  );
};

export default Country;
