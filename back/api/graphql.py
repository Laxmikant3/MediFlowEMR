from flask import Flask, request, jsonify
from flask_cors import CORS
from appointment_service import (
    get_appointments,
    update_appointment_status,
    add_or_update_appointment,
)

app = Flask(__name__)
CORS(app)

@app.route("/api/graphql", methods=["POST"])
def graphql_handler():
    body = request.json or {}
    query = body.get("query", "")
    variables = body.get("variables", {})

    if "getAppointments" in query:
        return jsonify({
            "data": {
                "getAppointments": get_appointments(
                    date=variables.get("date"),
                    status=variables.get("status")
                )
            }
        })

    if "updateAppointmentStatus" in query:
        return jsonify({
            "data": {
                "updateAppointmentStatus": update_appointment_status(
                    variables.get("id"),
                    variables.get("status")
                )
            }
        })

    if "saveAppointment" in query:
        return jsonify({
            "data": {
                "saveAppointment": add_or_update_appointment(
                    variables.get("input")
                )
            }
        })

    return jsonify({"errors": ["Unknown operation"]}), 400
