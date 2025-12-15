import { useState, useEffect } from "react";

export default function NewAppointmentModal({
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    duration: 30,
    doctorName: "",
    mode: "In-Person",
    status: "Scheduled",
    phone: "",
    email: "",
    reason: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[420px] max-h-[90vh] overflow-y-auto">
        <h3 className="font-semibold mb-4">
          {initialData ? "Edit Appointment" : "New Appointment"}
        </h3>

        {[
          "name",
          "date",
          "time",
          "duration",
          "doctorName",
          "phone",
          "email",
        ].map((field) => (
          <input
            key={field}
            name={field}
            type={
              field === "date"
                ? "date"
                : field === "time"
                ? "time"
                : field === "duration"
                ? "number"
                : "text"
            }
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full mb-3 border rounded-md px-3 py-2 text-sm"
          />
        ))}

        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="w-full mb-3 border rounded-md px-3 py-2 text-sm"
        >
          <option>In-Person</option>
          <option>Video Call</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-3 border rounded-md px-3 py-2 text-sm"
        >
          <option>Scheduled</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <textarea
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full mb-3 border rounded-md px-3 py-2 text-sm"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full mb-4 border rounded-md px-3 py-2 text-sm"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
