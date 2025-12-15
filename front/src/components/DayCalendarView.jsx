import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import {
  START_HOUR,
  END_HOUR,
  SLOT_HEIGHT,
  getStartHour,
  getCurrentOffset,
  getEventHeight,
} from "../utils/calendarUtils";

export default function DayCalendarView({
  date,
  appointments,
  onSelectSlot,
  onEventMove,
  onDateChange = () => {}, // ✅ SAFE DEFAULT
}) {
  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => i + START_HOUR
  );

  const containerRef = useRef(null);

  // -----------------------
  // Auto-scroll to first event
  // -----------------------
  useEffect(() => {
    if (!appointments?.length) return;

    const first = getStartHour(appointments[0]);
    if (first !== null && containerRef.current) {
      containerRef.current.scrollTop =
        (first - START_HOUR) * SLOT_HEIGHT - 80;
    }
  }, [appointments]);

  const nowOffset = getCurrentOffset();

  // -----------------------
  // Date helpers
  // -----------------------
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const getColor = (type) => {
    switch (type) {
      case "FOLLOW_UP":
        return "#f59e0b";
      case "VACCINATION":
        return "#8b5cf6";
      default:
        return "#3b82f6";
    }
  };

  // -----------------------
  // Date navigation (FIXED)
  // -----------------------
  const goToday = () => {
    onDateChange(new Date().toISOString().split("T")[0]);
  };

  const goPrev = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    onDateChange(d.toISOString().split("T")[0]);
  };

  const goNext = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    onDateChange(d.toISOString().split("T")[0]);
  };

  return (
    <div className="border rounded-xl bg-white overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        {/* Left */}
        <div className="flex items-center gap-2 font-medium text-sm">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          <span>Calendar</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={goToday}
            className="px-3 py-1 rounded border hover:bg-gray-100"
          >
            Today
          </button>

          <button onClick={goPrev} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft size={16} />
          </button>

          <button onClick={goNext} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight size={16} />
          </button>

          <span className="font-medium text-gray-700">
            {formattedDate}
          </span>
        </div>

        {/* Right */}
        <div className="text-xs text-gray-400">
          GMT+05:30
        </div>
      </div>

      {/* ================= DAY GRID ================= */}
      <div ref={containerRef} className="flex overflow-y-auto h-[600px]">
        {/* Time column */}
        <div className="w-16 border-r text-xs text-gray-400">
          {hours.map((h) => (
            <div key={h} className="h-[80px] pr-2 text-right">
              {h}:00
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 relative">
          {hours.map((h) => (
            <div
              key={h}
              className="h-[80px] border-b hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                onSelectSlot?.(`${String(h).padStart(2, "0")}:00`)
              }
            />
          ))}

          {/* Current time indicator */}
          {nowOffset !== null && (
            <div
              className="absolute left-0 right-0 h-[2px] bg-red-500 z-20"
              style={{ top: nowOffset }}
            />
          )}

          {/* Events */}
          {appointments?.map((a) => {
            const startHour = getStartHour(a);
            if (startHour === null) return null;

            const top = (startHour - START_HOUR) * SLOT_HEIGHT;
            const height = getEventHeight(a);

            return (
              <div
                key={a.id}
                draggable
                onDragEnd={(e) => {
                  const rect =
                    e.currentTarget.parentNode.getBoundingClientRect();
                  const y = e.clientY - rect.top;
                  const newHour =
                    START_HOUR + Math.floor(y / SLOT_HEIGHT);

                  onEventMove?.(a.id, newHour);
                }}
                className="absolute left-4 right-4 p-3 rounded-lg text-xs text-white shadow-md cursor-move"
                style={{
                  top,
                  height,
                  backgroundColor: getColor(a.type),
                }}
              >
                <p className="font-semibold">{a.title}</p>
                <p className="opacity-90">{a.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
