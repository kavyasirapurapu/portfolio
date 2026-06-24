# Interactive Developer Portfolio

A premium, modern, and highly interactive developer portfolio built by **Kavya**, an aspiring developer and 2nd-year Artificial Intelligence & Data Science student. 

This repository showcases a full-stack portfolio homepage that dynamically loads featured projects from a Node/Express backend and embeds three fully functional, premium demo applications.

## 🚀 Live Demo Applications

The portfolio features three built-in showcase applications:

### 1. 🛒 TechStore (E-Commerce Platform)
A clean and responsive tech store storefront featuring:
* **Dynamic Product Search:** Instantly filters products on keypress.
* **Sliding Cart Drawer:** A premium sliding drawer overlay to add, remove, and adjust product quantities.
* **LocalStorage Cart Sync:** Keeps your items and totals saved across page refreshes.
* **AI Product Recommendations:** Suggests contextually relevant add-on bundles based on the last item added to the cart (e.g., suggesting headphones when adding a laptop).

### 2. 🏃‍♂️ FitTrack (Fitness Tracker Dashboard)
A tracking dashboard with visual analytics:
* **Interactive SVG Goal Progress Ring:** Displays a circular indicator that fills up in real-time as you approach your daily calorie goal.
* **Daily Goal Editor:** Set custom calorie goals dynamically using in-page settings.
* **LocalStorage Persistence:** Workouts and logs are saved across sessions.
* **Multi-Metric Chart Switcher:** Toggle dashboard views between *Calories Burned* (Green Theme) and *Active Minutes* (Blue Theme) using a Chart.js visualization.

### 3. 💬 ChatApp (Real-Time Messaging)
A real-time chat application utilizing WebSockets:
* **Functional Channels & Rooms:** Seamlessly switch conversations between multiple contacts (e.g., Alex Developer, Sarah Designer, Project Team).
* **WebSocket Typing Indicators:** Displays real-time typing status bubbles as users type.
* **Room-Specific AI Chatbot:** Intercepts messages mentioning `@bot` to provide intelligent, room-aware helper responses.
* **Unread Message Badges:** Displays notifications and updates previews on sidebar contacts for incoming inactive messages.

---

## 🛠️ Technology Stack

* **Frontend:** Vanilla HTML5, CSS3 (Modern HSL variables & Glassmorphic variables), JavaScript (ES6+), [Lucide Icons](https://lucide.dev/), [Chart.js](https://www.chartjs.org/)
* **Backend:** Node.js, Express.js
* **Real-time Communication:** Socket.io (WebSockets)
* **Database:** MongoDB, Mongoose (with automated local mock fallback when offline)

---

## 💻 Quick Start & Installation

To run this portfolio and its applications locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed. Optionally, run a local [MongoDB](https://www.mongodb.com/) instance to test dynamic project seeding and contact form storage.

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/kavyasirapurapu/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Access in the browser:**
   Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.
