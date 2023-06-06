import { useCallback, useEffect, useState } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  useHandleSearchParams,
  useLoadInitialSearchParams,
} from "./utils/handleSearchParams";
import SearchBox from "./SearchBox";
import LoadingSpinner from "../../Common/LoadingSpinner";
import * as React from "react";

type LocatorProps = {
  // Will display results up to the verticalLimit (default 20, change with searchActions.setVerticalLimit(num))
  displayAllOnNoResults?: boolean;
  placeholderText?: string;
};


const Locator = (props: LocatorProps) => {
  const {
    displayAllOnNoResults = false,
    placeholderText,
  } = props;
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [focusedEntityId, setFocusedEntityId] = useState("");
  const [hoveredEntityId, setHoveredEntityId] = useState("");

  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);
  const initialParamsLoadedCallback = useCallback(
    () => setInitialParamsLoaded(true),
    [setInitialParamsLoaded]
  );

    // Load static and facet filters on page load.
    useLoadInitialSearchParams(initialParamsLoaded, initialParamsLoadedCallback);
    // Update the search params whenever the search state filters property changes.
    useHandleSearchParams(initialParamsLoaded);



  // Unset any selected, hovered, or focused markers on new search
  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [searchActions.state.query.queryId]);


  return (
    <div className="Locator">
    {(!initialParamsLoaded || isLoading) && <LoadingSpinner />}
    <div className="Locator-content">
        <SearchBox
        placeholderText={placeholderText}
        />
    </div>
    </div>
  );
};

export default Locator;