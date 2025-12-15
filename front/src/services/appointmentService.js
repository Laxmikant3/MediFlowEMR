const API_URL = process.env.REACT_APP_API_URL;

async function graphqlRequest(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]);
  return json.data;
}

// -----------------------
// GET appointments
// -----------------------
export async function getAppointments(filters = {}) {
  const query = `
    getAppointments
  `;

  const data = await graphqlRequest(query, filters);
  return data.getAppointments;
}

// -----------------------
// SAVE appointment  ✅ FIXED
// -----------------------
export async function saveAppointment(input) {
  const query = `
    saveAppointment
  `;

  const data = await graphqlRequest(query, {
    input: {
      ...input,
      id: input.id ?? Date.now(),   // ensure ID
    },
  });

  return data.saveAppointment;
}

// -----------------------
// UPDATE status
// -----------------------
export async function updateAppointmentStatus(id, status) {
  const query = `
    updateAppointmentStatus
  `;

  const data = await graphqlRequest(query, { id, status });
  return data.updateAppointmentStatus;
}

