from flask import Flask, request, jsonify, render_template
from twilio.rest import Client

app = Flask(__name__)

ACCOUNT_SID = "YOUR_TWILIO_SID"
AUTH_TOKEN = "YOUR_TWILIO_AUTH_TOKEN"
FROM_NUMBER = "YOUR_TWILIO_PHONE_NUMBER"

client = Client(ACCOUNT_SID, AUTH_TOKEN)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send_sms", methods=["POST"])
def send_sms():
    data = request.get_json()
    patient = data["patient"]
    doctor = data["doctor"]
    date = data["date"]
    time = data["time"]
    doctorPhone = data["doctorPhone"]
    reminder_type = data.get("type", "Appointment")

    try:
        client.messages.create(
            to=doctorPhone,
            from_=FROM_NUMBER,
            body=f"📅 Reminder ({reminder_type}): Patient {patient} with {doctor} on {date} at {time}."
        )
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
