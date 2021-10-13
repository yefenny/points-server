# Points Server

This is an app server when transactions can be made, you can subtract points from payers and get the payers' points balance.

### 1. Functionality

The app's functionality includes:

- Every user can add transactions that include the payer name, points, and timestamp.
- Every user can spend points that will be distributed by the oldest transactions (based on timestamp) without leaving any payer with a negative balance.
- Every user can see the payers' points balance.

### 2. Technology

- Back-End: Node.js, Express.js, RESTful API Endpoints

### 3. API Documentation

API Documentation details:

```text
/api
.
├── /transactions
│   └── POST
│       ├── /add
├── /points
    └── GET
        ├── /balance
│   └── POST
│       ├── /spend


```

#### POST `/api/transactions/add`

```js


// req.body

 {
     { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
 }

// res.body

{
}

```

#### POST `/api/points/spend`

```js
// req.header

// req.body
{
  points: 100
}
// res.body

 { payer: "DANNON",
   points: -100
 }


```

#### GET `/api/points/balance

```js


// res.body

   {
        "DANNON": 900
    }



```

### 4. How to run it

Use command line to navigate into the project folder and run the following in terminal

##### Local Node scripts

- To install the node project ===> npm install
- To run Node server (on port 8000) ===> npm start
