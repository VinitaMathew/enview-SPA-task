import React, { useState, ChangeEvent } from "react";
import "./SearchBox.scss";
import { Alert } from "../AlertsProps";

interface SearchBoxProps {
  data: Alert[];
  onSearch: (filteredData: Alert[]) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ data, onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  let tempInputValue = "";

  const handleSearch = () => {
    const filteredData = data.filter((item) => {
      const isTextMatch =
        tempInputValue === "" ||
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(tempInputValue.toLowerCase());
      const isDateRangeMatch = isDateInRange(item.timestamp);

      const vehicleMatch =
        tempInputValue === "" ||
        item.vehicle_friendly_name
          .toLowerCase()
          .includes(tempInputValue.toLowerCase());

      if (selectedFilter === "all") {
        return isTextMatch && isDateRangeMatch;
      } else if (selectedFilter === "vehicleNumber") {
        return vehicleMatch && isDateRangeMatch;
      }
      return true;
    });

    onSearch(filteredData);
  };

  const isDateInRange = (timestamp: string) => {
    if (!startDate || !endDate) {
      return true;
    }

    const alertDate = new Date(timestamp);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return alertDate >= start && alertDate <= end;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    tempInputValue = e.target.value;
    handleSearch();
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    setQuery("");
    onSearch(data);
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setQuery("");
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setQuery("");
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        className="search-text-box"
      />
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
        className="filter-select-box"
      >
        <option value="all">All</option>
        <option value="vehicleNumber">Vehicle #</option>
      </select>
      <span onClick={toggleDatePicker} className="date-picker">
        {startDate && endDate ? (
          <span>
            <b>Date Range:</b> {startDate} to {endDate}
          </span>
        ) : (
          "Select Date Range"
        )}
      </span>
      {showDatePicker && (
        <div>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </label>
          <label>
            End Date:
            <input type="date" value={endDate} onChange={handleEndDateChange} />
          </label>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
