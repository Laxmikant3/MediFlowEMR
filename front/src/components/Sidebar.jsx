import {
  Search,
  BookOpen,
  Menu,
  Activity,
  Calendar,
  Stethoscope,
  Pill,
  Users,
  Plus,
  Sparkles,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const iconClass =
    "w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer";

  return (
    <div className="fixed left-4 top-4 bottom-4 w-16 bg-white rounded-3xl shadow-lg flex flex-col items-center py-4 justify-between">
      {/* Top icons */}
      <div className="flex flex-col items-center gap-6">
        <Search className={iconClass} />
        <BookOpen className={iconClass} />
        <Menu className={iconClass} />
        <Activity className={iconClass} />
        <Calendar className={iconClass} />
        <Stethoscope className={iconClass} />
        <Pill className={iconClass} />
        <Users className="w-5 h-5 text-blue-600" /> {/* Active */}
      </div>

      {/* Middle add button */}
      <div className="flex flex-col items-center gap-6">
        <button className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700">
          <Plus className="w-5 h-5" />
        </button>

        <Sparkles className={iconClass} />
      </div>

      {/* Bottom settings */}
      <Settings className={iconClass} />
    </div>
  );
}
