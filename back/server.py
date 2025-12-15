import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

from appointment_service import (
    get_appointments,
    update_appointment_status,
    add_or_update_appointment,
)

# ---------------------------
# Load environment variables
# ---------------------------
load_dotenv()

APP_PORT = int(os.getenv("APP_PORT", 5000))
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "1") == "1"
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*")

app = Flask(__name__)

# ---------------------------
# CORS Configuration
# ---------------------------
CORS(
    app,
    resources={r"/graphql": {"origins": ALLOWED_ORIGINS}}
)

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
    print(f"🚀 Starting {os.getenv('APP_NAME', 'MediQueue')} backend")
    app.run(
        host="0.0.0.0",
        port=APP_PORT,
        debug=FLASK_DEBUG
    )
