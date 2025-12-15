# appointment_service.py
# Simulation of AWS Lambda + AppSync + Aurora (PostgreSQL)

# -----------------------------
# Mock Database (Aurora Simulation)
# -----------------------------
# Acts as an in-memory replacement for Aurora PostgreSQL
appointments_db = [
    {
        "id": 1,
        "name": "Sarah Johnson",
        "date": "2025-09-14",
        "time": "09:00",
        "duration": 30,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Confirmed",
        "mode": "In-Person"
    },
    {
        "id": 2,
        "name": "Michael Brown",
        "date": "2025-09-14",
        "time": "10:00",
        "duration": 45,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Upcoming",
        "mode": "In-Person"
    },
    {
        "id": 3,
        "name": "Emily Rodriguez",
        "date": "2025-09-13",
        "time": "11:30",
        "duration": 30,
        "doctorName": "Dr. Ananya Singh",
        "status": "Confirmed",
        "mode": "Video Call"
    },
    {
        "id": 4,
        "name": "David Miller",
        "date": "2025-09-12",
        "time": "15:00",
        "duration": 60,
        "doctorName": "Dr. Ananya Singh",
        "status": "Completed",
        "mode": "In-Person"
    },
    {
        "id": 5,
        "name": "Sophia Lee",
        "date": "2025-09-15",
        "time": "12:00",
        "duration": 20,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Upcoming",
        "mode": "Video Call"
    },
    {
        "id": 6,
        "name": "Chris Evans",
        "date": "2025-09-15",
        "time": "14:00",
        "duration": 30,
        "doctorName": "Dr. Ananya Singh",
        "status": "Scheduled",
        "mode": "In-Person"
    },
    {
        "id": 7,
        "name": "Ava Wilson",
        "date": "2025-09-11",
        "time": "16:00",
        "duration": 30,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Cancelled",
        "mode": "Video Call"
    },
    {
        "id": 8,
        "name": "Daniel Kim",
        "date": "2025-09-10",
        "time": "10:30",
        "duration": 40,
        "doctorName": "Dr. Ananya Singh",
        "status": "Completed",
        "mode": "In-Person"
    },
    {
        "id": 9,
        "name": "Olivia Martinez",
        "date": "2025-09-14",
        "time": "17:00",
        "duration": 25,
        "doctorName": "Dr. Rajesh Kumar",
        "status": "Confirmed",
        "mode": "Video Call"
    },
    {
        "id": 10,
        "name": "Noah Anderson",
        "date": "2025-09-16",
        "time": "09:30",
        "duration": 30,
        "doctorName": "Dr. Ananya Singh",
        "status": "Upcoming",
        "mode": "In-Person"
    }
]


# -----------------------------
# Query Resolver: Fetch Appointments
# -----------------------------
def get_appointments(date=None, status=None):
    """
    Simulates an AppSync Query resolver.

    Allows optional filtering by:
    - date (YYYY-MM-DD)
    - status (Confirmed, Upcoming, Completed, etc.)
    """

    results = appointments_db

    if date:
        results = [appt for appt in results if appt["date"] == date]

    if status:
        results = [appt for appt in results if appt["status"] == status]

    return results


# -----------------------------
# Mutation Resolver: Update Status
# -----------------------------
def update_appointment_status(appointment_id, new_status):
    """
    Simulates an AppSync Mutation resolver.

    Behavior:
    - Updates appointment status (Aurora transactional write)
    - Represents triggering AppSync subscriptions for real-time UI updates
    """

    for appointment in appointments_db:
        if appointment["id"] == appointment_id:
            appointment["status"] = new_status
            return appointment

    # Appointment not found
    return None


# -----------------------------
# Mutation Resolver: Insert or Update Appointment
# -----------------------------
def add_or_update_appointment(data):
    """
    Simulates INSERT or UPDATE operations in Aurora.

    Rules:
    - If `id` exists → UPDATE
    - If `id` is missing → INSERT new record
    """

    global appointments_db

    # -----------------------
    # UPDATE existing record
    # -----------------------
    if data.get("id"):
        for index, appt in enumerate(appointments_db):
            if appt["id"] == data["id"]:
                appointments_db[index] = {
                    **appt,
                    **data,
                    # Normalize time field if frontend sends startTime
                    "time": data.get("startTime", appt.get("time")),
                }
                return appointments_db[index]

    # -----------------------
    # INSERT new record
    # -----------------------
    new_id = max(appt["id"] for appt in appointments_db) + 1

    new_appointment = {
        "id": new_id,
        "name": data.get("name", ""),
        "date": data.get("date"),
        "time": data.get("startTime") or data.get("time"),
        "duration": data.get("duration", 30),
        "doctorName": data.get("doctorName", ""),
        "status": data.get("status", "Scheduled"),
        "mode": data.get("mode", "In-Person"),
        "type": data.get("type", "GENERAL"),
        "phone": data.get("phone"),
        "email": data.get("email"),
        "reason": data.get("reason"),
        "notes": data.get("notes"),
    }

    # Insert at top to simulate latest appointment first
    appointments_db.insert(0, new_appointment)
    return new_appointment
