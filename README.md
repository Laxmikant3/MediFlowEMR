# 🏥 MediFlowEMR  
### Appointment Scheduling & Queue Management System

MediFlowEMR is a simplified Electronic Medical Record (EMR) module focused on **Appointment Scheduling and Queue Management (Feature B)**.  
The project demonstrates an end-to-end flow from frontend UI to backend logic while simulating a production-grade architecture inspired by **AWS Lambda + AppSync + Aurora (PostgreSQL)**.

---

## 🎯 Objective

The objective of this assignment is to implement a **functional Appointment Management View** by:

- Designing a clear data contract  
- Implementing backend business logic  
- Integrating frontend state with backend data  
- Supporting filtering, updates, and real-time-like UI behavior  

---

## 🚀 Features

- 📅 Day-wise calendar view with hourly time slots  
- 🔁 Toggle between **Day View** and **List View**  
- 🗂 Appointment filtering via tabs:
  - Upcoming
  - Today
  - Past
  - All
- 🔍 Search appointments by patient name  
- ➕ Create & edit appointments via a side drawer  
- 🔄 Update appointment status with optimistic UI updates  
- ⏱ Auto-scroll to the first appointment of the day  
- 🔴 Current-time indicator in calendar view  
- 📤 Export appointments to CSV  
- 🎨 Medical-themed UI using Tailwind CSS  

---

## 🧠 Technology Stack

**Frontend**
- React
- Tailwind CSS

**Backend**
- Python 3.x

**API Layer**
- GraphQL-style Queries & Mutations (simulated)

**Data Layer**
- In-memory Python data structures simulating PostgreSQL (Aurora)

**Architecture**
- Lambda + AppSync simulation

---

## 📁 Folder Structure
```bash

MediFlowEMR/
│
├── backend/
│ ├── server.py # Flask server exposing GraphQL-style API
│ └── appointment_service.py # Core scheduling & queue logic
│
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ │ ├── AppointmentManagementView.jsx
│ │ ├── DayCalendarView.jsx
│ │ ├── EventDrawer.jsx
│ │ ├── AppointmentCard.jsx
│ │ ├── CalendarWidget.jsx
│ │ └── StatusCards.jsx
│ │
│ ├── services/
│ │ └── appointmentService.js # GraphQL-style API calls
│ │
│ ├── utils/
│ │ └── calendarUtils.js
│ │
│ ├── App.jsx
│ └── index.js
│
└── README.md
```


## 🗄 Backend Service Design (Task 1)

### Data Mocking

The backend simulates a PostgreSQL (Aurora) database using an in-memory list of appointment objects.  
More than ten mock appointments are created to represent realistic scheduling scenarios.

Each appointment includes:
- Patient name
- Appointment date
- Time and duration
- Assigned doctor
- Appointment status
- Visit mode (In-person or Video)

---

### Query Design: Get Appointments

The backend exposes a query-like function that retrieves appointments using optional filters such as date and status.  
This simulates an AppSync Query Resolver fetching data from Aurora.

---

### Mutation Design: Update Appointment Status

The status update mutation modifies a single appointment in the data store.

In a real production system:
- The update would occur within an Aurora transaction
- An AppSync subscription would notify all connected clients

This ensures data consistency and near real-time UI updates.

---

### Mutation Design: Add or Update Appointment

A single mutation supports both appointment creation and editing:

- If an appointment ID exists, the record is updated
- If not, a new appointment is created

This mirrors typical INSERT and UPDATE operations in relational databases.

---

## 🔌 GraphQL-Style API Contract

Although implemented over HTTP, the backend follows a **GraphQL-inspired structure**:

- Queries retrieve data without side effects  
- Mutations modify data in a controlled manner  
- Frontend communicates using structured query and mutation requests  

---

## 🎯 Frontend Integration (Task 2)

- Initial data is loaded when the component mounts  
- Calendar interactions filter appointments by selected date  
- Tab selections apply date-based filtering logic  
- Status updates use optimistic UI updates  
- Drawer forms allow creating and editing appointments  
- UI state refresh ensures backend consistency  

---

## 🔁 Data Consistency Strategy

- A single shared data store acts as the source of truth  
- All reads and writes go through backend service functions  
- Frontend refreshes state after each mutation  
- Design simulates real-time synchronization used in EMR systems  

---

## ▶️ Setup & Run Instructions

### 1️⃣ Backend Setup (Python)

Navigate to the backend folder and install dependencies:
```bash

cd backend
pip install flask flask-cors
```

Start the backend server:
```bash

python server.py
```


Backend runs at:
```bash
http://127.0.0.1:5000/graphql
```


---

### 2️⃣ Frontend Setup (React)

Navigate to the frontend folder:

```bash
cd frontend
npm install
```


Start the React development server:

```bash
npm start
```



Frontend runs at:
```bash
http://localhost:3000
```


## ✅ Assignment Requirement Coverage

- Mock appointment data implemented  
- Query function with optional filters implemented  
- Mutation function for status updates implemented  
- Calendar-based filtering implemented  
- Tab-based filtering implemented  
- Optimistic UI updates implemented  
- End-to-end frontend-backend integration completed  

---

## 🏁 Conclusion

MediFlowEMR successfully delivers a **functional Appointment Scheduling and Queue Management feature** aligned with real-world EMR system design principles.

The project demonstrates:
- Clear separation of concerns  
- Well-defined data contracts  
- Consistent state management  
- Practical simulation of cloud-native healthcare architecture  

---






