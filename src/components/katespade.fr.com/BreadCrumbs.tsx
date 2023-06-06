import * as React from "react";
import {
  slugify,
  BaseUrl,
  AnswerExperienceConfig,
  TEMP_SETTINGS,
} from "../../components/config/katespade.fr.com/globalConfig";
import { AddressType, Link } from "@yext/pages/components";

type data = {
  name: string;
  parents: Parent[] | null;
  address: AddressType;
};

interface Parent {
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

interface Crumb {
  name: string;
  slug: string;
  childrenCount: number;
}

const BreadCrumbs = (props: data) => {

  /**
   * This function takes an array of `parents` and generates an array of breadcrumb data
   * based on the metadata of the parents entities.
   *
   * @param parents - An array of entity objects representing the hierarchical path to the current entity
   * @returns - An array of breadcrumb data, where each item contains the name, slug and childrenCount properties.
   */
  const setURL = (parents: Parent[] | null): JSX.Element[] | null => {
    if (!parents) return null;
  
    const data: Crumb[] = parents.map((parent: Parent) => {
      const entityType = parent?.meta?.entityType?.id;
      let slugPrefix: string[] = [];
  
      if (entityType === "Coach_region") {
        slugPrefix = parents
          .filter((p) => p !== parent && p.meta.entityType.id !== "Coach_city" && p.meta.entityType.id !== "Coach_root")
          .map((p) => p.slug ?? slugify(p.id + " " + p.name));
      } else if (entityType === "Coach_city") {
        slugPrefix = parents
          .filter((p) => p !== parent && p.meta.entityType.id !== "Coach_city" && p.meta.entityType.id !== "Coach_root")
          .map((p) => p.slug ?? AnswerExperienceConfig.countrySlug);
      }

      const slug = slugPrefix.join("/") + "/" + (parent.slug ?? slugify(parent.id + " " + parent.name));
      if(entityType === "Coach_region" || entityType === "Coach_city" || entityType === "Coach_country"){
        return {
          name: parent.name,
          slug: slug,
          childrenCount: parent.dm_baseEntityCount,
        }; 
      }else{
        return {
          name: "",
          slug: "",
          childrenCount: 0
        };
      }
    });
    
    const breadcrumbs = data.map((crumb: Crumb, index: number) => (
      crumb.name !== "" ?
      <li key={crumb.slug}>
        <Link
          href={`${BaseUrl}/${( crumb.name=='FR' ? 'index.html' : crumb.slug )}`}
          rel="noopener noreferrer"
          eventName={"BreadCrumbs" + (index + 1)}
        >
          {crumb.name}
        </Link>
      </li> : <></>
    ));
  
    return breadcrumbs;
  }; // endof setURL

  const list = setURL(props.parents);

  return (
    <div className="breadcrumb">
      <div className="container">
        {list ? (
          <ul>
            <li>
              <a href={TEMP_SETTINGS.LOCATOR_PAGE_URL}>Home</a>
            </li>
            {list}
            <li>
              {(props && props.address && props.address.line1) ||
                (props && props.name)}
            </li>
          </ul>
        ) : (
          <div className="skeleton skeleton-text"></div>
        )}
      </div>
    </div>
  );
};
export default BreadCrumbs;
