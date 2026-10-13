# ScholarshipHub backend

The React/Vite frontend uses a Node HTTP API. The API loads `backend/.env` and stores application records in MongoDB.

## Run locally

Open two terminals, one in each folder:

```sh
cd backend
npm start
```

```sh
cd frontend
npm run dev
```

AI matching uses the Gemini API. Set `GEMINI_API_KEY` in `backend/.env`; keep it on the server and never add it to frontend code. The backend defaults to `gemini-3.8-flash`. Optionally set `GEMINI_MODEL` to another model available to your key. Gemini API quota and billing are controlled by your Google AI Studio project.

Set `MONGODB_URI` (or `MONGO_URI`) in `backend/.env`, and optionally `MONGODB_DATABASE` to select a database. Set a strong `ADMIN_PASSWORD` there to enable `/admin`. Student passwords are stored as scrypt hashes. Student and admin sessions are held in memory and expire after seven and eight hours respectively, so restarting the API signs users out. Applications require a student account. Existing `backend/data/store.json` records are imported into MongoDB on first startup. Do not use the sample server for public production hosting without adding HTTPS and rate limiting.

Vite proxies `/api` to `http://localhost:3001`. Set `API_PORT` to choose another API port in both processes. Records are stored in MongoDB in the `app_state` collection and survive server restarts.

## API

- `GET /api/health`
- `POST /api/auth/register` with `name`, `email`, `password`
- `POST /api/auth/login` with `email`, `password`
- `GET /api/auth/me` and `POST /api/auth/logout` with a student bearer token
- `POST /api/admin/login` with `password`; admin dashboard and scholarship creation routes require its bearer token
- `GET /api/admin/dashboard`
- `POST /api/admin/scholarships`
- `GET /api/scholarships?q=&filter=`
- `GET /api/categories`
- `GET /api/saved?email=`
- `POST /api/scholarships/:id/save`
- `POST /api/scholarships/:id/apply`
- `POST /api/match` with `field`, `level`, `marks`, `marksScale` (`percentage` or `cgpa10`), and optional `category`, `state`, and `familyIncome`; requires `GEMINI_API_KEY`. Returns Gemini-ranked catalog entries with an estimated fit score and explanation.
- `POST /api/subscribe` with `email`
- `POST /api/contact` with `name`, `email`, and `message`

Scholarship records are example directory data and currently do not include full official eligibility rules. AI match scores are estimates, not a confirmed eligibility decision or probability of receiving funding. Verify requirements and deadlines with providers. Profiles submitted to matching are saved in the local JSON store, including marks and any optional income provided. Application actions record a local application and open the provider page; they do not submit forms to scholarship providers.
