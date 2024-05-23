# Expense-tracker

UI
![Company Profile Presentation](https://github.com/bhuvan2205/Expense-Tracker/assets/56767330/3b853728-a0b6-485b-a43f-e25f18f2ee07)

To get Started and run the application in local

Setup Kinde **Auth**

Create an account in https://kinde.com/ to get the credentails and add your credentials in .env

KINDE_DOMAIN=***
KINDE_CLIENT_ID=***
KINDE_CLIENT_SECRET=***
KINDE_REDIRECT_URI=http://localhost:5173/api/callback
KINDE_LOGOUT_REDIRECT_URI=http://localhost:5173


Setup **Postgres Sql**

Create an account in https://neon.tech/ to get the credentails and add the connection string in .env

DATABASE_URL=***

To run the server,

```
bun install 
bun run dev
```

TO run the client,

```
cd client
bun install
bun run dev
```

This project was created using `bun init` in bun v1.1.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
