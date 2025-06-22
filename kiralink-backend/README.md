# KiraLink Backend

This is the production-ready backend for KiraLink, a SaaS platform for homeowners to track rental payments and send automated reminders to their tenants.

[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/downloads/release/python-3110/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.103.2-blue)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Features

- **JWT Authentication**: Secure user registration and login with access and refresh tokens.
- **Property & Tenant Management**: Full CRUD APIs for properties and tenants.
- **Automated Reminders**: Celery-powered background tasks send email and SMS reminders for rent payments.
- **Real Payment Integration**: Subscription management via Iyzico.
- **Automated Invoicing**: PDF invoices are generated and emailed upon successful payment.
- **Production Ready**: Containerized with Docker, configured for Gunicorn, and includes logging, rate limiting, and error tracking.

## 🛠️ Tech Stack

- **Backend**: FastAPI, Python 3.11
- **Database**: PostgreSQL
- **Background Tasks**: Celery, Redis
- **Notifications**: SendGrid (Email), Twilio (SMS)
- **Payments**: Iyzico
- **Deployment**: Docker, Gunicorn

## 📦 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://your-repo-url/kiralink.git
cd kiralink
```

### 2. Configure Environment Variables

Create a `.env` file inside the `kiralink-backend` directory by copying the example file.

```bash
cp kiralink-backend/.env.example kiralink-backend/.env
```

Now, open `kiralink-backend/.env` and fill in all the required credentials for your database, JWT secret, and third-party services (SendGrid, Twilio, Iyzico, Sentry).

### 3. Run with Docker Compose

This is the recommended way to run the application for both development and production.

```bash
docker-compose up --build
```

The application will be available at `http://localhost:8000`.

## 📄 API Documentation

Once the application is running, the interactive API documentation (Swagger UI) is available at:

- **Swagger UI**: [`http://localhost:8000/docs`](http://localhost:8000/docs)
- **ReDoc**: [`http://localhost:8000/redoc`](http://localhost:8000/redoc)

## ⚙️ Core Components

### Reminder Scheduler

The system uses **Celery** with **Redis** to schedule and execute background tasks. The main task, `check_and_send_reminders_task`, runs daily at 8:00 AM UTC to check for rent due dates and dispatch notifications.

You can monitor the Celery worker logs via `docker-compose logs celery_worker`.

### Payment Flow

1. The user initiates a payment via the `/subscriptions/create-payment` endpoint.
2. The backend records a `PENDING` payment in the database and requests a checkout form from **Iyzico**.
3. The user is redirected to the Iyzico payment page.
4. After payment, Iyzico sends a callback to `/subscriptions/iyzico-callback`.
5. The backend verifies the callback, updates the payment status to `SUCCESS` or `FAILURE`, extends the user's subscription, and triggers invoice generation.

### Backups

A backup script is provided at `scripts/backup.sh`. It can be run manually or as a cron job inside a container or on the host to dump the PostgreSQL database. Invoices stored in `static/invoices` should also be backed up periodically.

To run a manual backup:

```bash
# Make sure to set the POSTGRES_PASSWORD environment variable
docker-compose exec db /path/to/scripts/backup.sh
```

## 🧪 Running Tests

To run the full test suite with coverage:

```bash
# From within the kiralink-backend directory
pytest --cov=app --cov-report=term-missing
```

This will run all tests and print a coverage report to the console.

## 🔒 Security

- **HTTPS**: Always deploy behind a reverse proxy (like Nginx or Traefik) that handles SSL termination.
- **Rate Limiting**: Critical endpoints (auth, payments) are rate-limited to prevent abuse.
- **Input Validation**: Pydantic schemas enforce strict data validation for all incoming requests.

---

This project is licensed under the MIT License.
