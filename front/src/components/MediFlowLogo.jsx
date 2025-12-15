import { Plus } from "lucide-react";

export default function MediFlowLogo({ size = 28 }) {
  return (
    <div className="flex items-center gap-2">
      {/* Logo Icon */}
      <div
        className="flex items-center justify-center rounded-lg"
        style={{
          width: size,
          height: size,
          backgroundColor: "#2563eb", // blue-600 (medical)
        }}
      >
        <Plus className="text-white" size={size * 0.6} strokeWidth={3} />
      </div>

      {/* Brand Name */}
      <span className="text-lg font-semibold tracking-tight">
        <span className="text-gray-800 text-2xl">MediFlow</span>
        <span className="ml-1 text-blue-600 text-2xl">EMR</span>
      </span>
    </div>
  );
}
