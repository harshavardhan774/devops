# 💬 MERN Chat App

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)  
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)  
[![Express.js](https://img.shields.io/badge/Framework-Express.js-lightgrey?logo=express)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)](https://www.mongodb.com/)  
[![Socket.IO](https://img.shields.io/badge/RealTime-Socket.IO-black?logo=socket.io)](https://socket.io/)  

---


---

## 🔎 Project Overview

The **MERN Chat App** is a real-time messaging application built using the **MERN stack** with **Socket.IO**.  
It works like popular apps such as **WhatsApp** or **Messenger**, allowing users to register, log in securely, and chat instantly with others in real time.  

This project demonstrates a full-stack implementation of **real-time communication**, **secure authentication**, and a clean **responsive UI**.

---

## ✨ Features
- 🔐 Secure login & registration with **JWT cookies**  
- 💬 Real-time messaging using **Socket.IO**  
- 👤 User authentication & session management  
- 📱 Responsive UI with **Tailwind CSS**  
- ⚡ Instant message updates without refreshing  
- 📂 Scalable MERN architecture  

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (with cookies)  
- **Real-time:** Socket.IO  

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm  
- MongoDB (local or MongoDB Atlas)  

### Installation
1. Clone the repository  
   ```bash
   git clone https://github.com/0xcris7prp/mern-chat-app.git
   cd mern-chat-app
   cd client && npm install
   cd ../server && npm install
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   #Run the App
   # Run backend
    cd server
    npm start
    
    # Run frontend
    cd ../client
    npm start
