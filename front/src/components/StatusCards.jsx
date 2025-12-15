import {
  Calendar,
  CheckCircle,
  Clock,
  Video,
} from "lucide-react";

export default function StatusCards({ appointments }) {
  const today = new Date().toISOString().split("T")[0];

  const todayCount = appointments.filter(a => a.date === today).length;
  const confirmed = appointments.filter(a => a.status === "Confirmed").length;
  const upcoming = appointments.filter(a => a.date > today).length;
  const virtual = appointments.filter(a => a.mode === "Video Call").length;

  const Card = ({ icon: Icon, iconBg, badge, badgeBg, count, label }) => (
    <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <span className={`px-3 py-1 text-xs font-medium rounded-full ${badgeBg}`}>
          {badge}
        </span>
      </div>

      <div>
        <p className="text-3xl font-bold">{count}</p>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <Card
        icon={Calendar}
        iconBg="bg-blue-500"
        badge="Today"
        badgeBg="bg-blue-100 text-blue-600"
        count={todayCount}
        label="Today's Appointments"
      />

      <Card
        icon={CheckCircle}
        iconBg="bg-green-500"
        badge="Confirmed"
        badgeBg="bg-green-100 text-green-600"
        count={confirmed}
        label="Confirmed Appointments"
      />

      <Card
        icon={Clock}
        iconBg="bg-indigo-500"
        badge="Upcoming"
        badgeBg="bg-indigo-100 text-indigo-600"
        count={upcoming}
        label="Upcoming Appointments"
      />

      <Card
        icon={Video}
        iconBg="bg-pink-500"
        badge="Virtual"
        badgeBg="bg-pink-100 text-pink-600"
        count={virtual}
        label="Telemedicine Sessions"
      />
    </div>
  );
}
