// Import types, components and other functionality
import React, { useState } from "react";
import customButton from "../../styles/CustomButton.module.css";
import timeRange from "../../styles/TimeRange.module.css";

// Type definition for the props expected
interface TimeRangeSelectorProps {
  onTimeRangeChange: (from: string, to: string, localFiles: boolean) => void;
}

// Define component, allowing users to select a date range
const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  onTimeRangeChange,
}) => {
  // State hooks to manage the 'from' and 'to' date values
  // Set default date values, can be changed by user in interface
  const [from, setFrom] = useState("2023-06-01");
  const [to, setTo] = useState("2023-06-28");
  const [checked, setChecked] = useState(false);

  const handleChangeCheckbox = () => {
    setChecked(!checked);
  };

  // Handle form submission, prevent default form behavior and trigger callback
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTimeRangeChange(from, to, checked);
  };

  // JSX layout for component, include two input fields and submit button
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="from" className={timeRange["custom-text-label"]}>
          From
        </label>
        <input
          type="date"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={timeRange["custom-input-field"]}
          required
        />
      </div>
      <div>
        <label htmlFor="to" className={timeRange["custom-text-label"]}>
          To
        </label>
        <input
          type="date"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={timeRange["custom-input-field"]}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChangeCheckbox}
          />
          Use local files
        </label>
      </div>
      <button type="submit" className={customButton["custom-button"]}>
        Show heart rate data
      </button>
    </form>
  );
};

// Export component to make it available
export default TimeRangeSelector;
