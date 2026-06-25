const form = document.getElementById("reservationForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const reservation = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        check_in: document.getElementById("check_in").value,
        check_out: document.getElementById("check_out").value,
        guests: Number(document.getElementById("guests").value),
        // Yeni eklediğimiz oda tipi değeri:
        room_type: document.getElementById("room_type").value 
    };

    try {
        const response = await fetch(
            "http://localhost:5001/reservations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservation)
            }
        );

        if (!response.ok) {
            throw new Error("Sunucu yanıt vermedi");
        }

        const data = await response.json();

        alert("Reservation completed successfully!");

        form.reset();

    } catch (error) {
        console.error(error);
        alert("Reservation failed!");
    }
});