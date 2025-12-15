from flask import Flask, request, jsonify
from flask_cors import CORS
from appointment_service import (
    get_appointments,
    update_appointment_status,
    add_or_update_appointment,
)

app = Flask(__name__)
CORS(app)

@app.route("/graphql", methods=["POST"])
def graphql_handler():
    body = request.json
    print("Received GraphQL Request:", body)
    query = body.get("query", "")
    variables = body.get("variables", {})

    # ---------------------------
    # Query: getAppointments
    # ---------------------------
    if "getAppointments" in query:
        date = variables.get("date")
        status = variables.get("status")

        data = get_appointments(date=date, status=status)
        return jsonify({
            "data": {
                "getAppointments": data
            }
        })

    # ---------------------------
    # Mutation: updateAppointmentStatus
    # ---------------------------
    if "updateAppointmentStatus" in query:
        appointment_id = variables.get("id")
        new_status = variables.get("status")

        updated = update_appointment_status(appointment_id, new_status)
        return jsonify({
            "data": {
                "updateAppointmentStatus": updated
            }
        })

    # ---------------------------
    # Mutation: saveAppointment
    # ---------------------------
    if "saveAppointment" in query:
        appointment = variables.get("input")
        saved = add_or_update_appointment(appointment)

        return jsonify({
            "data": {
                "saveAppointment": saved
            }
        })

    # ---------------------------
    # Fallback
    # ---------------------------
    return jsonify({
        "errors": ["Unknown operation"]
    }), 400


if __name__ == "__main__":
    app.run(debug=True)
