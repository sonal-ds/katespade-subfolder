import { useState } from "react";
import { useSearchActions, Matcher } from "@yext/search-headless-react";
import type { SelectableStaticFilter } from "@yext/search-headless-react";
import { executeSearch, getUserLocation } from "@yext/search-ui-react";
import LoadingSpinner from "../../Common/LoadingSpinner";
import * as React from "react"; 
import { GEOLOCATE_RADIUS } from "../../../components/config/katespade.fr.com/globalConfig";
import { encodeStaticFilters } from "./utils/handleSearchParams";
import { svgIcons } from "../../../assets/svgs/svgIcon";


interface GeolocateButtonProps {
  className?: string;
  redirectToSearchPage?: boolean;
  searcherPath?: string;
  content?: any;
}

const GeolocateButton = (props: GeolocateButtonProps) => {
  const { className, redirectToSearchPage, searcherPath, content } = props;

  const searchActions = useSearchActions();
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);

  async function handleGeolocationClick() {
    setIsFetchingLocation(true);
    try {
      const position = await getUserLocation();

      // Set userlocation bias
      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const newFilter: SelectableStaticFilter = {
        displayName: "My Location",
        selected: true,
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          matcher: Matcher.Near,
          value: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            radius: 1609 * GEOLOCATE_RADIUS,
          },
        },
      };

      searchActions.setStaticFilters([newFilter]);
      searchActions.setOffset(0);
      searchActions.resetFacets();
      await executeSearch(searchActions);

      // Redirect to another page with the url params filled out.
      if (redirectToSearchPage && searcherPath) {
        const searchParams = encodeStaticFilters([newFilter]);
        if (searchParams) {
          window.location.href = `${searcherPath}?${searchParams.toString()}`;
        }
      }
    } catch (e) {
      alert("User location could not be determined.");
      console.error(e);
    } finally {
      setIsFetchingLocation(false);
    }
  }

  return (
    <>
      <button className={className} onClick={handleGeolocationClick}>
        {content ? content : svgIcons.Searchbaricon}
        <span className="sr-only">Geolocate.</span>
      </button>
      {isFetchingLocation && <LoadingSpinner />}
    </>
  );
};

export default GeolocateButton;