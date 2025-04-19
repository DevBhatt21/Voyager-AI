// src/components/PlacesAutocomplete.jsx
import { useEffect, useRef, useState } from "react";

export default function PlacesAutocomplete({ onPlaceSelected }) {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const sessionToken = useRef(null);
  const serviceRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.maps?.places?.AutocompleteSuggestion) {
        clearInterval(interval);
        sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
        serviceRef.current = new window.google.maps.places.AutocompleteSuggestion();
      }
    }, 500);
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    if (!value || !serviceRef.current) {
      setSuggestions([]);
      return;
    }

    const { suggestions } = await serviceRef.current.getPlaceSuggestions({
      input: value,
      sessionToken: sessionToken.current,
    });

    setSuggestions(suggestions);
  };

  const handleSelect = (suggestion) => {
    onPlaceSelected?.(suggestion);
    setSuggestions([]);
    inputRef.current.value = suggestion.text;
  };

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        placeholder="Search location..."
        ref={inputRef}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <ul className="bg-white shadow rounded mt-1">
        {suggestions.map((s, idx) => (
          <li
            key={idx}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(s)}
          >
            {s.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
