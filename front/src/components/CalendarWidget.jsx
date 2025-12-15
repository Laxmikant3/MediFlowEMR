import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function CalendarWidget({ selectedDate, onSelect }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // Previous month fillers
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      inactive: true,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({
      day: d,
      inactive: false,
    });
  }

  // Next month fillers
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push({
      day: calendarDays.length,
      inactive: true,
    });
  }

  const formatDate = (day) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const isSelected = (day) =>
    selectedDate === formatDate(day);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() =>
            setCurrentMonth(new Date(year, month - 1, 1))
          }
        >
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </button>

        <p className="font-medium text-sm">
          {currentMonth.toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </p>

        <button
          onClick={() =>
            setCurrentMonth(new Date(year, month + 1, 1))
          }
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-2">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-2 text-sm">
        {calendarDays.map((item, idx) => (
          <button
            key={idx}
            disabled={item.inactive}
            onClick={() =>
              !item.inactive && onSelect(formatDate(item.day))
            }
            className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center
              ${
                item.inactive
                  ? "text-gray-300"
                  : isSelected(item.day)
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {item.day}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 space-y-2 text-xs">
        <Legend color="bg-green-500" label="Confirmed" />
        <Legend color="bg-blue-500" label="Scheduled" />
        <Legend color="bg-gray-400" label="Completed" />
        <Legend color="bg-red-500" label="Cancelled" />
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-gray-500">{label}</span>
    </div>
  );
}
