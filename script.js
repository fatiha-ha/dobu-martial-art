// LOGIN DETAILS
const correctUser = "student";
const correctPass = "dobu123";


// LOGIN
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === correctUser && pass === correctPass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
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
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    window.location.href = "login.html";
    return;
  }
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const alreadyBooked = bookings.some(b => b.day === day && b.type === type && b.time === time);
  if (alreadyBooked) {
    alert("You have already booked this class.");
    return;
  }

  const booking = { day, type, time };
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

// AUTH STATE
function applyAuthState() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  // swap nav buttons
  const authArea = document.getElementById("auth-buttons");
  if (authArea) {
        if (loggedIn) {
      authArea.innerHTML = `
        <a href="myaccount.html"><button class="btn-logout">MY ACCOUNT</button></a>
        <button class="btn-logout" onclick="logout()">LOGOUT</button>`;
    } else {
      authArea.innerHTML = `
        <a href="login.html"><button class="btn-logout">LOGIN</button></a>
        <a href="register.html"><button class="btn-logout">REGISTER</button></a>`;
    }

  }

  // hide GET STARTED when logged in
  const getStarted = document.getElementById("get-started-btn");
  if (getStarted) getStarted.style.display = loggedIn ? "none" : "";

  // hide booking section when not logged in
  const bookingSection = document.getElementById("booking-section");
  if (bookingSection) bookingSection.style.display = loggedIn ? "" : "none";
}

document.addEventListener("DOMContentLoaded", applyAuthState);

//lOGIN FROM MEMBERSHIP PAGE
function joinNow(plan) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (loggedIn) {
    localStorage.setItem("membership", plan)
    window.location.href = "myaccount.html";
  } else {
    window.location.href = "login.html";
  }
}

//Display Current Membership 
const membershipDisplay = document.getElementById("membershipDisplay");
if (membershipDisplay) {
  const plan = localStorage.getItem("membership");
  membershipDisplay.innerText = plan ? plan : "No membership yet";
}