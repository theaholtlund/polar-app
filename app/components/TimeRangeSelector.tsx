// Import types, components and other functionality
import React, { useState } from "react";

// Type definition for the props expected
interface TimeRangeSelectorProps {
  onTimeRangeChange: (from: string, to: string) => void;
}

// Define component, allowing users to select a date range
const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  onTimeRangeChange,
}) => {
  // State hooks to manage the 'from' and 'to' date values
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Handle form submission, prevent default form behavior and trigger callback
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTimeRangeChange(from, to);
  };

  // JSX layout for component, include two input fields and submit button
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="from" className="block text-label">
          From
        </label>
        <input
          type="date"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div>
        <label htmlFor="to" className="block text-label">
          To
        </label>
        <input
          type="date"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Fetch Heart Rates
      </button>
    </form>
  );
};

// Export component to make it available
export default TimeRangeSelector;
