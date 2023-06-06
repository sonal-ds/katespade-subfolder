import { FieldValueStaticFilter, useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";
import * as React from "react";
import LoadingSpinner from "../../Common/LoadingSpinner";
import {
  groupResults,
  getNoResultMessage,
  LOCATOR_STATIC_FILTER_FIELD,
} from "../../config/katespade.fr.com/globalConfig";
import "react-perfect-scrollbar/dist/css/styles.css";
import { svgIcons } from "../../../assets/svgs/svgIcon";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import LocationCard from "./LocationCard";
import '../../../types/i18n';
import { useTranslation } from "react-i18next";
import { StaticFilters } from "@yext/search-ui-react";
import Locator from "./Locator";

const SearchLayout = (props: any): JSX.Element => {
  const searchActions = useSearchActions();
  console.log(searchActions.state)
  const verticalResults = useSearchState((state) => groupResults(state.vertical.results));
  //hardcode filters to get all options (vs facets only showing options that have available results)
  const staticFilters = [
    {
        fieldId: 'c_locatorFiltersStoreType',
        displayName: 'Store Types',
        options: [
            { value: "Retail",  displayName: 'Speciality'},
            { value: "Outlet" },
        ]
    },
    {
        fieldId: 'c_kateSpadeLocatorFiltersServices',
        displayName: "Services",
        options: [
            { value: "Contactless Pay Via Secure Payment Link" },
            { value: "Home Delivery" },
            { value: "Virtual Shopping Appointments" },
            { value: "Warranty Services" },
        ]
    }
]
  const checkIsLocationFilter = (filter: FieldValueStaticFilter) => {
      return (
        filter.fieldId === "builtin.location" ||
        filter.fieldId === "builtin.region" ||
        filter.fieldId === "address.countryCode"
      );
    };

  const getSearchPlace = () => {
      const activeFilter = searchActions.state?.filters?.static?.find(
          (f) =>
          f.selected &&
          f.filter.kind === "fieldValue" &&
          (LOCATOR_STATIC_FILTER_FIELD === "builtin.location"
              ? checkIsLocationFilter(f.filter)
              : LOCATOR_STATIC_FILTER_FIELD === f.filter.fieldId) &&
          f.displayName
      ) ?? null;
      return activeFilter?.displayName
  }
  const [isLoading, setIsloading] = React.useState(false);
  const { t } = useTranslation();

  const allStoresMessage = t("All Stores");

  const [allowlocation] = React.useState("");

  const windowSize = useWindowDimensions();
  const [showFilterModal, setShowFilterModal]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = React.useState(false);
  const loader = isLoading ? <LoadingSpinner /> : "";

  
  const LocatorInstructionalText = props.LocatorInstructionalText;
  const placeholder = props.placeholder;

  const addClass = () => {
    document.body.setAttribute("class", "mapView");
  };

  const showModelOnMobile = () => {
    if (windowSize && windowSize.width && windowSize.width < 767) {
      setShowFilterModal(true);
    } else {
      setShowFilterModal(false);
    }
  };

  return (
    <>
      {loader}
      <div className="locator-full-width">
        <div className="locator-container">
          <div className={showFilterModal ? "leftBlock leftSide" : "leftBlock hidden sm:block"}>
            <div
              onClick={() => {
                setShowFilterModal(false);
              }}
              className="filter-close-btn"
            >
              +
            </div>
            <div className="LocatorFilters-titleRow">{ t('Filter By') }</div>
            {staticFilters?.map((filter) => {
                return (
                    <StaticFilters title={filter.displayName} defaultExpanded={false} searchOnChange={true} fieldId={filter.fieldId}
                    filterOptions={filter.options}
                    customCssClasses={{
                      staticFiltersContainer: "border-b border-b-light-gray3"
                    }}
                    />
                )
              })}   
          </div>

          <div className="rightBlock">
            {allowlocation.length > 0 ? (
              <div className="for-allow">{allowlocation}</div>
            ) : (
              ""
            )}

            <div className="location-with-filter">
              <h3 className="">{LocatorInstructionalText}</h3>
            </div>

            <div className="search-outer">
              <div className="search-form">
                <Locator placeholderText={placeholder} />
              </div>
            </div>

            <div className="mobile-btns">
              <a
                className="button before-icon listBtn"
                href="javascript:void(0);"
                onClick={() => {
                  document.body.classList.remove("mapView");
                }}
              >
                {svgIcons.listView} Tapstry Location
              </a>
              <a
                className="button before-icon mapBtn"
                href="javascript:void(0);"
                onClick={addClass}
              >
                {svgIcons.mapView} Map View
              </a>
            </div>

            <div className="Locator-resultsSummary Text--small"> {Object.keys(verticalResults).length <= 0 ? getNoResultMessage(getSearchPlace()) : getSearchPlace() ?  (`${t('Stores within')} 100 ${t('kilometers of')} ${getSearchPlace()}`) : allStoresMessage}</div>
              { Object.keys(verticalResults).sort((a:string,b:string) => (a > b) ? -1 : 1).map((key:string, index:any)=>{                             
                return (
                  <>
                    <div className="result-counts">
                        <div className="ResultList-groupSeparator Heading--head">
                        {verticalResults[key].length == 0 ? 
                              "" :  <span className={`pb-2 md:pb-4 storeHeading` + (index != 0 ? ' store-sub-heading' : '')}>

                               {key == "Retail" ? "Speciality": key} {`(${verticalResults[key].length})`}
                              </span>}
                            </div>
                            {index === 0 && windowSize && windowSize.width < 767 ? <div onClick={showModelOnMobile} className="LocatorFilters-titleRow">Filter by</div> : <></>}
                        </div>
                        {verticalResults[key].length
                            ?
                            verticalResults[key].map((location: any) => {
                                return (location.rawData && (<LocationCard result={location}></LocationCard>))
                            })
                            : <></>
                        }
                </>
                )
              })}
            </div>
          </div>
        </div>
    </>
  );
};
export default SearchLayout;
