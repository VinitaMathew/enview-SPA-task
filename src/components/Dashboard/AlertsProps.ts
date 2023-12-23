export interface Alert {
  id: string;
  alert_type: string;
  vehicle_id: string;
  driver_friendly_name: string;
  vehicle_friendly_name: string;
  timestamp: string;
  isFalseAlarm?: boolean;
}
