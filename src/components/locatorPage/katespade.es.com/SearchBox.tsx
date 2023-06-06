import { FilterSearch, executeSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import GeolocateButton from "./GeolocateButton";
import { useEffect } from "react";
import * as React from "react";
import SearchIcon from "../../Common/SearchIcon";

const searchFields = [
  {
    fieldApiName: "builtin.location",
    entityType: "location",
  },
];

type SearchBoxProps = {
  placeholderText?: string;
};

const SearchBox = (props: SearchBoxProps) => {
  const { placeholderText } = props;

  const searchActions = useSearchActions();

  // When the FilterSearch component updates the search state with the users selection execute a new search.
  useEffect(() => {
    if (searchActions.state.filters.static?.find((f) => f.selected)) {
      executeSearch(searchActions);
    }
  }, [searchActions, searchActions.state.filters.static]);

  return (
    <div className="flex items-center">
      <div className="search-form flex w-full h-9">
        <div className="relative w-full">
          <div className="absolute right-4 top-6 -translate-y-1/2 text-brand-primary z-10">
            <SearchIcon />
          </div>
          <FilterSearch
            customCssClasses={{
              filterSearchContainer: "font-primary w-full",
              inputElement: "w-full"
            }}
            label=""
            placeholder={placeholderText}
            searchFields={searchFields}
            searchOnSelect={true}
          />
        </div>
        <GeolocateButton className="button ml-4 p-4" />
      </div>
    </div>
  );
};

export default SearchBox;