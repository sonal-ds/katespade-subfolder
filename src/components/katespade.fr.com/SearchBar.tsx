import * as React from "react";
import { TEMP_SETTINGS, getUserLatLng } from "../../components/config/katespade.fr.com/globalConfig";
import SearchIcon from "../../assets/svgs/search_icon.svg"
import { SearchBarProps, UserLocation } from "../../types/SearchBarTypes";

const SearchBar = (props: SearchBarProps) => {
  const [autocompleteInput, setAutocompleteInput] =
    React.useState<HTMLInputElement | null>(null);
  const pageAutocompleteRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    /** CODE EXPLAIN:- Code for google autocomplete */
    if (typeof google === "object" && typeof google.maps === "object") {
      const pageAutocomplete = pageAutocompleteRef.current as HTMLInputElement;
      
      const autocomplete = new google.maps.places.Autocomplete(
        pageAutocomplete
      );
      setTimeout(() => {
        autocomplete.setComponentRestrictions({
          country: [TEMP_SETTINGS.GOOGLE_SEARCH_BOUND_COUNTRIES],
        });
      }, 100);
      autocomplete.addListener("place_changed", function () {
        /** CODE EXPLAIN:- get selected place lat and lng */
        const place = autocomplete.getPlace();
        const latitude =
          place && place.geometry && place.geometry.location
            ? place.geometry.location.lat()
            : 0;
        const longitude =
          place && place.geometry && place.geometry.location
            ? place.geometry.location.lng()
            : 0;
        window.location.href = `${TEMP_SETTINGS.LOCATOR_PAGE_URL}?q=${place.formatted_address}&lat=${latitude}&lng=${longitude}&sm=${place.formatted_address}`;
      });

      if (autocomplete) {
        pacSelectFirst(pageAutocomplete);
      }
    }
  }, []);

  /**
   * CODE EXPLAIN:- handle the search button click
   *
   */
  function handleSearchLocationButtonClick() {
    const keydown = new Event("keydown");
    Object.defineProperty(keydown, "keyCode", {
      get: function () {
        return 13;
      },
    });
    Object.defineProperty(keydown, "which", {
      get: function () {
        return 13;
      },
    });
    if (autocompleteInput) {
      autocompleteInput.dispatchEvent(keydown);
    }
  }

  function pacSelectFirst(input: HTMLInputElement) {
    /** CODE EXPLAIN:- bind enter to get first showing record of google autocomplete */
    const _addEventListener = input.addEventListener;

    function addEventListenerWrapper(
      type: string,
      listener: (event: Event | { which: number }) => void
    ): void {
      if (type == "keydown") {
        const orig_listener = listener;

        listener = function (event: Event | { which: number }) {
          const suggestion_selected =
            document.getElementsByClassName("pac-item-selected").length > 0;

          if (
            ((event as { which: number }).which == 13 ||
              (event as { which: number }).which == 9) &&
            !suggestion_selected
          ) {
            const simulated_downarrow = new Event("keydown");
            Object.defineProperty(simulated_downarrow, "keyCode", {
              value: 40,
            });
            Object.defineProperty(simulated_downarrow, "which", { value: 40 });
            orig_listener.apply(input, [simulated_downarrow]);
          }

          orig_listener.apply(input, [event]);
        };
      }
      _addEventListener.apply(input, [type, listener]);
    }
    if (input.addEventListener) {
      input.addEventListener = addEventListenerWrapper;
    }
    setAutocompleteInput(input);
  }

  const getMyCurrentLocation = () => {
    getUserLatLng()
      .then((response: UserLocation) => {
        if (response.latitude && response.longitude && response.address) {
          const inputElement: HTMLInputElement | null = document.getElementById(
            "search-location-button_dm_page"
          ) as HTMLInputElement | null;
          if (inputElement) {
            inputElement.value = "My Location";
          }
          window.location.href = `${TEMP_SETTINGS.LOCATOR_PAGE_URL}?q=${response.address}&lat=${response.latitude}&lng=${response.longitude}&sm=My Location`;
        }
      })
      .catch((error: Error) => {
        if (error && error.message) {
          alert(error.message);
        }
      });
  };

  return (
    <>
      <div className="search-form dm-page-search-form">
        <p className="top-text">{props.instruction}</p>
        <input
          ref={pageAutocompleteRef}
          type="text"
          placeholder="e.g. Paris, France"
          name="google_autocomplete_country"
          id="google_autocomplete_country"
          className="text-sm bg-white outline-none h-9 w-full p-2 rounded-md border border-gray-300 focus:border-blue-600 FilterSearchInput pac-target-input"
        />
        <button
          className="button button-search"
          aria-label="Search bar icon"
          id="search-location-button_dm_page"
          onClick={handleSearchLocationButtonClick}
        >
          <img src={SearchIcon} alt="search button" />
        </button>
      </div>
      <div className="use-my-location">
        <button  onClick={getMyCurrentLocation}>
          Use my Location
        </button>
      </div>
    </>
  );
};

export default SearchBar;
