import React, { useState } from "react";
import { alertData } from "./stub/AlertsData";
import SearchBox from "./SearchBox/SearchBox";
import "./Dashboard.scss";
import { convertTimestamp } from "./util/AlertsUtil";
import { ALERT_CONSTANTS } from "../Constants";
import { Alert } from "./AlertsProps";

export default function Dashboard() {
  const [allAlertsData, setAllAlertsData] = useState<Alert[]>(alertData);
  const [searchResults, setSearchResults] = useState<Alert[]>(alertData);

  const handleSearch = (results: Alert[]) => {
    setSearchResults(results);
  };

  const handleMarkAsFalseAlarm = (id: string) => {
    const updatedData = allAlertsData.map((item) => {
      if (item.id === id) {
        return { ...item, isFalseAlarm: true };
      }
      return item;
    });
    setAllAlertsData(updatedData);

    const resultsData = searchResults.map((item: Alert) => {
      if (item.id === id) {
        return { ...item, isFalseAlarm: true };
      }
      return item;
    });
    setSearchResults(resultsData);
  };

  return (
    <div className="dashboard-container">
      <SearchBox data={allAlertsData} onSearch={handleSearch} />
      <div className="alerts-wrapper">
        <h2 className="section-heading">{ALERT_CONSTANTS.ALERTS_HEADING}</h2>
        <ul className="alerts-list">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((alert: Alert, index: number) => {
              return (
                <li key={index} className="alert-item">
                  <div className="content">
                    <div className="alert-title">
                      <b>{alert.alert_type}</b>
                      <div>{convertTimestamp(alert.timestamp)}</div>
                    </div>
                    <div>
                      <b>Driver:</b> {alert.driver_friendly_name} /{" "}
                      {alert.vehicle_friendly_name}
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkAsFalseAlarm(alert.id)}
                    style={{
                      backgroundColor: alert.isFalseAlarm ? "#e9e2e2" : "unset",
                    }}
                    className="alert-button"
                  >
                    {alert.isFalseAlarm
                      ? ALERT_CONSTANTS.ALARM_MARKED_TEXT
                      : ALERT_CONSTANTS.ALARM_BUTTON_TEXT}
                  </button>
                </li>
              );
            })
          ) : (
            <li className="not-found-text">{ALERT_CONSTANTS.NOT_FOUND_TEXT}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
