from flask import Flask, request, jsonify
from flask_cors import CORS

from appointment_service import (
    get_appointments,
    update_appointment_status,
    add_or_update_appointment,
)

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST"])
def handler():
    body = request.json or {}
    query = body.get("query", "")
    variables = body.get("variables", {})

    if "getAppointments" in query:
        data = get_appointments(
            date=variables.get("date"),
            status=variables.get("status")
        )
        return jsonify({"data": {"getAppointments": data}})

    if "updateAppointmentStatus" in query:
        updated = update_appointment_status(
            variables.get("id"),
            variables.get("status")
        )
        return jsonify({"data": {"updateAppointmentStatus": updated}})

    if "saveAppointment" in query:
        saved = add_or_update_appointment(variables.get("input"))
        return jsonify({"data": {"saveAppointment": saved}})

    return jsonify({"errors": ["Unknown operation"]}), 400
