import React, { useState } from "react"
import axios from "axios"
import debounce from "lodash/debounce"

const LocationSearchInput = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const handleInputChange = async (e) => {
    const value = e.target.value
    setInputValue(value)

    if (!value) {
      setSuggestions([])
      return
    }

    try {
      const response = await axios.get(`https://api.locationiq.com/v1/autocomplete`, {
        params: {
          key: import.meta.env.VITE_LOCATIONIQ_API_KEY,
          q: value,
          format: "json",
        },
      })

      setSuggestions(response.data)
    } catch (err) {
      console.error("LocationIQ error:", err)
    }
  }

  const handleSelect = (place) => {
    setInputValue(place.display_name)
    setSuggestions([])
    onSelect(place)
  }
  const debouncedFetch = debounce(async (value) => {
    try {
      const response = await axios.get("https://api.locationiq.com/v1/autocomplete", {
        params: {
          key: import.meta.env.VITE_LOCATIONIQ_API_KEY,
          q: value,
          format: "json",
        },
      });
      setSuggestions(response.data);
    } catch (err) {
      console.error("LocationIQ error:", err);
    }
  }, 500);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Start typing a location..."
        className="w-full p-2 border rounded"
      />
      {suggestions.length > 0 && (
        <ul className="bg-white border mt-2 rounded shadow max-h-60 overflow-y-auto">
          {suggestions.map((place, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LocationSearchInput
