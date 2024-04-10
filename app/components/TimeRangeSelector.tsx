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
        <label
          htmlFor="from"
          className="block text-sm font-medium text-gray-700"
        >
          From
        </label>
        <input
          type="date"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To
        </label>
        <input
          type="date"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        Fetch Heart Rates
      </button>
    </form>
  );
};

// Export component to make it available
export default TimeRangeSelector;
