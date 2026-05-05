// LOGIN DETAILS
const correctUser = "student";
const correctPass = "dobu123";

// PAGE PROTECTION
if (!window.location.pathname.includes("index.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// LOGIN
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === correctUser && pass === correctPass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";
  } else {
    document.getElementById("message").innerText = "Login failed";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// BOOK CLASS
function bookClass(day, type, time) {
  const booking = { day, type, time };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  createReceipt(booking);
  alert("Booked! Receipt downloaded.");
}

// SHOW BOOKINGS
const bookingList = document.getElementById("bookingList");
if (bookingList) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.forEach(b => {
    const li = document.createElement("li");
    li.innerText = `${b.day} - ${b.type} - ${b.time}`;
    bookingList.appendChild(li);
  });
}

// RECEIPT IMAGE
function createReceipt(booking) {
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fillRect(0,0,500,250);

  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  ctx.fillText("DoBu Martial Arts Booking Receipt", 70, 40);
  ctx.fillText(`Class: ${booking.type}`, 50, 90);
  ctx.fillText(`Day: ${booking.day}`, 50, 120);
  ctx.fillText(`Time: ${booking.time}`, 50, 150);

  const link = document.createElement("a");
  link.download = "booking_receipt.png";
  link.href = canvas.toDataURL();
  link.click();
}