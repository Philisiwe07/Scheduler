const form = document.getElementById("appointmentForm");
    const tableBody = document.querySelector("#appointmentsList tbody");

    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      const patient = document.getElementById("patient").value;
      const doctor = document.getElementById("doctor").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const doctorPhone = document.getElementById("doctorPhone").value;

      // Update table
      if(tableBody.children[0].children.length === 1){
        tableBody.innerHTML = ""; // remove "No appointments yet"
      }
      const row = document.createElement("tr");
      row.innerHTML = `<td>${patient}</td><td>${doctor}</td><td>${date}</td><td>${time}</td>`;
      tableBody.appendChild(row);

      // Send SMS via Python backend
      try {
        const res = await fetch("/send_sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patient, doctor, date, time, doctorPhone })
        });
        const data = await res.json();
        if(data.success){
          alert("✅ Appointment booked & SMS sent!");
        } else {
          alert("⚠️ SMS failed: " + data.error);
        }
      } catch(err){
        alert("❌ Error sending SMS: " + err);
      }

      form.reset();
    });

                