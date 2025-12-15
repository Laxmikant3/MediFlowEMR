import {
  User,
  Phone,
  Mail,
  Video,
  Stethoscope,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AppointmentCard({
  appointment,
  onStatusChange,
  onEdit,
}) {
  const badge = {
    Confirmed: "bg-green-100 text-green-600",
    Scheduled: "bg-blue-100 text-blue-600",
    Completed: "bg-gray-200 text-gray-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className=" p-5 shadow-sm bg-white/80
      backdrop-blur
      border border-blue-100
      rounded-xl
      shadow-sm">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>

          <div>
            <p className="font-semibold">{appointment.name}</p>
            <p className="text-xs text-gray-500">
              {appointment.date} · {appointment.time} · {appointment.duration} min
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Stethoscope className="w-3 h-3" />
              {appointment.doctorName} ·{" "}
              {appointment.mode === "Video Call" ? (
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3 text-purple-600" />
                  Video Call
                </span>
              ) : (
                "In-Person"
              )}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 h-fit rounded-full text-xs ${badge[appointment.status]}`}
        >
          {appointment.status}
        </span>
      </div>

      {/* Reason */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
        <p className="font-medium">
          {appointment.reason || "Consultation"}
        </p>
        <p>{appointment.notes || "—"}</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> {appointment.phone || "—"}
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3" /> {appointment.email || "—"}
          </span>
        </div>

        <div className="flex gap-3">
          <Pencil
            className="w-4 h-4 text-blue-500 cursor-pointer"
            onClick={() => onEdit(appointment)}
          />
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() =>
              onStatusChange(appointment.id, "Cancelled")
            }
          />
        </div>
      </div>
    </div>
  );
}
