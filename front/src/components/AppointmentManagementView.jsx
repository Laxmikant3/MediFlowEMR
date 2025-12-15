import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { CalendarDays, List } from "lucide-react";
import MediFlowLogo from "./MediFlowLogo";


import CalendarWidget from "./CalendarWidget";
import AppointmentCard from "./AppointmentCard";
import StatsCards from "./StatusCards";
import NewAppointmentModal from "./NewAppointmentModal";
import DayCalendarView from "./DayCalendarView";
import EventDrawer from "./EventDrawer";

import {
  getAppointments,
  updateAppointmentStatus,
  saveAppointment,
} from "../services/appointmentService";

// -----------------------
// Helpers
// -----------------------
const today = new Date().toISOString().split("T")[0];

export default function AppointmentManagementView() {
  // -----------------------
  // State
  // -----------------------
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [dayView, setDayView] = useState(false); // 🔥 TOGGLE STATE
  const [drawerOpen, setDrawerOpen] = useState(false);

  // -----------------------
  // Initial load
  // -----------------------
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);

      // keep filters in sync
      setFiltered(
        selectedDate ? data.filter(a => a.date === selectedDate) : data
      );
    } catch {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Calendar filter
  // -----------------------
  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    const data = await getAppointments({ date });
    setFiltered(data);
  };

  // -----------------------
  // Tabs filter
  // -----------------------
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "Today") {
      setFiltered(appointments.filter(a => a.date === today));
    } else if (tab === "Upcoming") {
      setFiltered(appointments.filter(a => a.date >= today));
    } else if (tab === "Past") {
      setFiltered(appointments.filter(a => a.date < today));
    } else {
      setFiltered(appointments);
    }
  };

  // -----------------------
  // Optimistic status update
  // -----------------------
  const handleStatusUpdate = async (id, status) => {
    const prev = [...appointments];

    setAppointments(a =>
      a.map(x => (x.id === id ? { ...x, status } : x))
    );

    try {
      await updateAppointmentStatus(id, status);
    } catch {
      setAppointments(prev);
      setError("Failed to update appointment");
    }
  };

  // -----------------------
  // Search
  // -----------------------
  const visible = filtered.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  // -----------------------
  // Export CSV
  // -----------------------
  const exportCSV = () => {
    const headers = ["Name", "Date", "Start Time", "Doctor", "Status", "Mode"];

    const rows = appointments.map(a => [
      a.name,
      a.date,
      a.startTime || a.time,
      a.doctorName,
      a.status,
      a.mode,
    ]);

    const csv =
      headers.join(",") + "\n" +
      rows.map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "appointments.csv";
    link.click();
  };

  // -----------------------
  // Save appointment (modal)
  // -----------------------
  const handleSaveAppointment = async (data) => {
    try {
      await saveAppointment(data);
      await loadAppointments();
      setShowModal(false);
      setEditing(null);
    } catch {
      setError("Failed to save appointment");
    }
  };

  // -----------------------
  // Create from day slot
  // -----------------------
  const handleCreateFromSlot = (time) => {
    setEditing({
      date: selectedDate,
      startTime: time,
      endTime: "09:30",
      status: "Scheduled",
    });
    setDrawerOpen(true);
  };

  // -----------------------
  // Drag / move event
  // -----------------------
  const handleEventMove = async (id, newHour) => {
    await saveAppointment({
      id,
      startTime: `${String(newHour).padStart(2, "0")}:00`,
    });
    await loadAppointments();
  };

  // -----------------------
  // Save from drawer
  // -----------------------
  const handleDrawerSave = async (data) => {
    await saveAppointment({
      ...data,
      date: data.date || selectedDate,
    });
    await loadAppointments();
    setDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6 pl-24  min-h-screen
        from-sky-50
        via-white
        to-blue-100">

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center justify-between mb-8">
          {/* Left: Logo + Name */}
          <MediFlowLogo />

          {/* Right: Actions */}
          <div className="flex gap-3">
            {/* existing buttons */}
          </div>
        </div>


        <div className="flex gap-3">
          <button
              onClick={() => setDayView((prev) => !prev)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium
                transition-all duration-200
                ${
                  dayView
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {dayView ? (
                <>
                  <List className="w-4 h-4 text-white" />
                  List View
                </>
              ) : (
                <>
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                  Day View
                </>
              )}
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center bg-green-300 gap-2 px-4 py-2 rounded-lg border text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>

          <button
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
          >
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>
      </div>

      <StatsCards appointments={appointments} />

      <div className="grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-3">
          <CalendarWidget
            selectedDate={selectedDate}
            onSelect={handleDateSelect}
          />
        </div>

        {/* Right */}
        <div className="col-span-9">
          {dayView ? (
            <DayCalendarView
              date={selectedDate}
              appointments={appointments.filter(a => a.date === selectedDate)}
              onSelectSlot={handleCreateFromSlot}
              onEventMove={handleEventMove}
              onDateChange={(newDate) => {
                console.log("Date changed to:", newDate); // 🔥 DEBUG
                setSelectedDate(newDate);
              }}
            />

          ) : (
            <>
              {/* Tabs + Search */}
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  {["Upcoming", "Today", "Past", "All"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-3 py-1.5 rounded-full text-xs ${
                        activeTab === tab
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <input
                  placeholder="Search appointments..."
                  className="border rounded-md px-3 py-2 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {loading && <p className="text-blue-600">Loading...</p>}
              {error && <p className="text-red-600">{error}</p>}

              <div className="space-y-4">
                {visible.map(appt => (
                  <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                    onStatusChange={handleStatusUpdate}
                    onEdit={(a) => {
                      setEditing(a);
                      setShowModal(true);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <NewAppointmentModal
          initialData={editing}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSave={handleSaveAppointment}
        />
      )}

      {/* Drawer */}
      <EventDrawer
        open={drawerOpen}
        initial={editing}
        onClose={() => setDrawerOpen(false)}
        onSave={handleDrawerSave}
      />
    </div>
  );
}
