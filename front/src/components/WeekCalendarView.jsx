import { getStartHour, START_HOUR } from "../utils/calendarUtils";

export default function WeekCalendarView({ weekDates, appointments }) {
  return (
    <div className="grid grid-cols-8 border rounded-xl bg-white">
      <div />

      {weekDates.map((d) => (
        <div key={d} className="p-2 text-center text-sm font-medium">
          {d}
        </div>
      ))}

      {Array.from({ length: 12 }, (_, i) => i + START_HOUR).map((h) => (
        <>
          <div className="border-t text-xs text-right pr-2">
            {h}:00
          </div>
          {weekDates.map((d) => (
            <div key={d + h} className="border-t h-20 relative">
              {appointments
                .filter((a) => a.date === d && getStartHour(a) === h)
                .map((a) => (
                  <div
                    key={a.id}
                    className="absolute inset-1 bg-blue-500 text-white text-xs p-1 rounded"
                  >
                    {a.name}
                  </div>
                ))}
            </div>
          ))}
        </>
      ))}
    </div>
  );
}
