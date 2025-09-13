document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    let patient = document.getElementById("patient").value;
    let doctor = document.getElementById("doctor").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;   
    fetch("send_sms.php",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify({
            patient, doctor, date, time
             
        })
    }).then(response => response.json())
    .then(data => {
        if(data.success) {  
            alert("Appointment booked and SMS sent!");}
            else {
                alert("Appointment booked but failed to send SMS.");
            }       

    });
});

            


