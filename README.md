# Job Board Application

A fully functional, responsive job portal built with **React 19**, featuring real-time filtering, persistent bookmarking, and containerization.

## 🚀 Features

* **Dynamic Job Listing**: Displays jobs with details including company name, location, salary, and job type.
* **Advanced Filtering**:
    * **Search**: Real-time search by Job Title or Company Name.
    * **Skills**: Multi-select filtering using `react-select`.
    * **Salary Range**: Interactive dual-range slider using `react-slider`.
    * **Job Type**: Quick-filter buttons for Remote, Hybrid, and All jobs.
* **View Toggles**: Switch between **Grid View** and **List View** layouts.
* **Bookmarking System**: Save favorite jobs to a "My Bookmarks" page. State is persisted across browser refreshes using `localStorage`.
* **Navigation**: Client-side routing with `react-router-dom`, including a custom 404 error page.
* **Sidebar Layout**: Sticky sidebar for filters providing a professional dashboard experience.



## 🛠️ Tech Stack

* **Frontend**: React 19, Vite
* **Icons**: Lucide-React
* **Routing**: React Router v7
* **Components**: React-Select (Multi-select), React-Slider (Salary Range)
* **Containerization**: Docker (Nginx for production serving)

---

## 💻 Local Development

1.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```
    *(Note: `--legacy-peer-deps` is required due to React 19 peer dependency mismatches in third-party libraries.)*

2.  **Run in development mode**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

---

## 🐳 Docker Instructions

This application is containerized using a multi-stage Docker build to ensure a lightweight production image served via Nginx.



1.  **Build the Docker Image**:
    ```bash
    docker build -t job-board-app .
    ```

2.  **Run the Container**:
    ```bash
    docker run -p 8080:80 job-board-app
    ```

3.  **Access the App**:
    Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📁 Project Structure

* `/src/components`: Reusable UI components like `JobCard`.
* `/src/pages`: Page-level components (`JobBoard`, `TrackerPage`).
* `/src/data`: Contains `mock-data.json` for job and company info.
* `Dockerfile`: Production environment configuration.
* `.dockerignore`: Files excluded from the Docker build context.