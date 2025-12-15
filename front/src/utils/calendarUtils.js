export const START_HOUR = 7;
export const END_HOUR = 19;
export const SLOT_HEIGHT = 80; // px per hour

// -----------------------
// Get start hour safely
// -----------------------
export function getStartHour(appt) {
  if (appt.startTime) {
    return parseInt(appt.startTime.split(":")[0], 10);
  }

  if (appt.time) {
    const [time, meridian] = appt.time.split(" ");
    let hour = parseInt(time.split(":")[0], 10);
    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;
    return hour;
  }

  return null;
}

// -----------------------
// Event height from duration
// -----------------------
export function getEventHeight(appt) {
  if (!appt.startTime || !appt.endTime) return 60;

  const [sh, sm] = appt.startTime.split(":").map(Number);
  const [eh, em] = appt.endTime.split(":").map(Number);

  const minutes = (eh * 60 + em) - (sh * 60 + sm);
  return (minutes / 60) * SLOT_HEIGHT;
}

// -----------------------
// Current time indicator
// -----------------------
export function getCurrentOffset() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  if (hour < START_HOUR || hour > END_HOUR) return null;

  return (
    (hour - START_HOUR) * SLOT_HEIGHT +
    (minutes / 60) * SLOT_HEIGHT
  );
}
