
## 🤖 My AI Usage

I used **ChatGPT** as my AI assistant throughout the development of this project. Below is how and when I used it:

### 🔹 Database

* Generated **MySQL `CREATE TABLE` queries** for `users`, `shop_owners`, `sweets`, and `purchases`.
* Asked for **dummy data** to populate the tables for testing.
* Created the **`db.js` connection file** with AI help.

### 🔹 Backend

* **Auth (Login & Register)**

  * Used ChatGPT to build `authController.js` with proper response codes.
  * Generated routes (`/register`, `/login`) with JWT setup.
  * Added error handling cases with AI guidance.

* **Sweet Management**

  * Asked ChatGPT to generate `sweetController.js` functions for add, get, search, update, delete sweets.
  * Middleware for role-based access (`owner` vs `user`) created with AI help.

* **Purchase & Inventory**

  * Built `purchaseController.js` with AI for purchasing sweets and restocking by owners.
  * AI suggested using JWT to get the correct `user_id` and `owner_id`.

* **Environment & JWT**

  * AI guided me to set up `.env`, secret keys, and `authMiddleware.js` for verifying tokens.

### 🔹 Testing

* **Auth Tests (`auth.test.js`)**

  * Used ChatGPT to generate test cases for successful register/login and error cases (duplicate user, wrong password, missing fields).

* **Sweet Tests (`sweets.test.js`)**

  * AI wrote test cases for add, update, delete, and search sweets.
  * AI also suggested **missing scenarios**:

    * Role-based restrictions (user vs owner).
    * Search by name, category, price range.
    * Purchase success and insufficient stock.
    * Restock allowed only by owner.

### 🔹 Frontend

* **Welcome Page**

  * AI generated the initial description and styled layout using Tailwind CSS.

* **Auth Pages**

  * Register/Login components styled with Tailwind were created with ChatGPT’s help.
  * JWT handling in frontend (`auth.js`) was suggested by AI.

* **Owner Dashboard**

  * Modal for Add/Edit sweet built with AI guidance.
  * Integrated API calls (add, edit, delete sweets) with AI examples.

* **User Dashboard**

  * Card component for sweets created with AI.
  * AI suggested logic for **search, category filter, and price range filter**.

### 🔹 Reflection

ChatGPT was used in **every part of this project**: database setup, backend routes/controllers, authentication, test cases, and frontend UI.
It helped me:

* Move faster by generating boilerplate and sample code.
* Catch missing scenarios (like extra test cases and role-based checks).
* Learn how to properly implement **JWT authentication, protected routes, and validation**.

I always reviewed and modified the AI’s output to fit my project, so I was learning while building.

