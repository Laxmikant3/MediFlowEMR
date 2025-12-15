import { useState, useEffect } from "react";

/* -----------------------
   Initial empty form
----------------------- */
const EMPTY_FORM = {
  id: null,
  type: "GENERAL",
  title: "",
  name: "",
  date: "",
  startTime: "",
  endTime: "",
  duration: "",
  doctorName: "",
  status: "Scheduled",
  mode: "In-Person",
  phone: "",
  email: "",
  reason: "",
  notes: "",
};

export default function EventDrawer({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY_FORM);

  /* -----------------------
     Sync form (Edit vs New)
  ----------------------- */
  useEffect(() => {
    if (open) {
      if (initial) {
        setForm({ ...EMPTY_FORM, ...initial }); // Edit
      } else {
        setForm(EMPTY_FORM); // New
      }
    }
  }, [initial, open]);

  if (!open) return null;

  /* -----------------------
     Change handler
  ----------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-set title when type changes
    if (name === "type") {
      const titleMap = {
        GENERAL: "General Checkup",
        FOLLOW_UP: "Follow-up Consultation",
        VACCINATION: "Vaccination",
      };

      setForm((prev) => ({
        ...prev,
        type: value,
        title: titleMap[value],
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* -----------------------
     Submit
  ----------------------- */
  const handleSubmit = () => {
    onSave(form);
    setForm(EMPTY_FORM); // ✅ clear after submit
  };

  /* -----------------------
     Close
  ----------------------- */
  const handleClose = () => {
    setForm(EMPTY_FORM); // ✅ clear on close
    onClose();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl p-6 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {form.id ? "Edit Appointment" : "New Appointment"}
        </h2>
        <button onClick={handleClose} className="text-gray-400 hover:text-black">
          ✕
        </button>
      </div>

      {/* Appointment Type */}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
      >
        <option value="GENERAL">General Checkup</option>
        <option value="FOLLOW_UP">Follow-up Consultation</option>
        <option value="VACCINATION">Vaccination</option>
      </select>

      {/* Title */}
      <input
        name="title"
        placeholder="Appointment title"
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
        value={form.title}
        onChange={handleChange}
      />

      {/* Date */}
      <input
        type="date"
        name="date"
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
        value={form.date}
        onChange={handleChange}
      />

      {/* Time */}
      <div className="flex gap-2 mb-3">
        <input
          type="time"
          name="startTime"
          className="w-1/2 border px-3 py-2 rounded text-sm"
          value={form.startTime}
          onChange={handleChange}
        />
        <input
          type="time"
          name="endTime"
          className="w-1/2 border px-3 py-2 rounded text-sm"
          value={form.endTime}
          onChange={handleChange}
        />
      </div>

      {/* Patient */}
      <input
        name="name"
        placeholder="Patient name"
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone number"
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email address"
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
        value={form.email}
        onChange={handleChange}
      />

      {/* Doctor */}
      <input
        name="doctorName"
        placeholder="Doctor name"
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
        value={form.doctorName}
        onChange={handleChange}
      />

      {/* Mode + Status */}
      <div className="flex gap-2 mb-3">
        <select
          name="mode"
          className="w-1/2 border px-3 py-2 rounded text-sm"
          value={form.mode}
          onChange={handleChange}
        >
          <option>In-Person</option>
          <option>Video Call</option>
        </select>

        <select
          name="status"
          className="w-1/2 border px-3 py-2 rounded text-sm"
          value={form.status}
          onChange={handleChange}
        >
          <option>Scheduled</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Reason */}
      <input
        name="reason"
        placeholder="Reason for visit"
        className="w-full mb-3 border px-3 py-2 rounded text-sm"
        value={form.reason}
        onChange={handleChange}
      />

      {/* Notes */}
      <textarea
        name="notes"
        placeholder="Notes"
        className="w-full mb-4 border px-3 py-2 rounded text-sm"
        rows={3}
        value={form.notes}
        onChange={handleChange}
      />

      {/* Save */}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Save Appointment
      </button>
    </div>
  );
}
