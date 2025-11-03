# Content Service API

This is a backend service built with Node.js, Express, and MongoDB for managing articles. It provides a RESTful API for standard CRUD (Create, Read, Update, Delete) operations on content, as well as endpoints for creating source articles and filtering content by level or category.

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/) (A running instance, either local or cloud-based like MongoDB Atlas)

### Running Locally
1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Set up environment variables:**
    Create a file named `.env` in the root of the project and add the following variables.
    ```.env
    # The connection string for your MongoDB database
    MONGO_URL=mongodb://localhost:27017/your_db_name
    DB_NAME=your_db_name
    
    # The port you want the server to run on
    PORT=3000
    ```

3. **Start the server:**
    ```sh
    npm start
    ```
    The server should now be running and connected to MongoDB, accessible at `http://localhost:3000`.

## <caption> API Endpoints

All endpoints are prefixed with `/contents`.

| Method | Endpoint | Description | Request Body/Query Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Creates a new article. | **Body:** (See Article Schema) |
| `GET` | `/` | Gets all articles. Can be filtered. | **Query Params (Optional):** <br> `?level=easy` <br> `?category=technology` |
| `GET` | `/:id` | Gets a single article by its ID. | |
| `PUT` | `/:id` | Updates an article by its ID. | **Body:** `{ "title": "New Title", ... }` |
| `DELETE` | `/:id` | Deletes an article by its ID. | |
| `POST` | `/source` | Creates a new "Source Article". | **Body:** (Schema for `SourceArticle`) |

---

## 📝 Article Schema

This is the main data model for articles stored in the `articles` collection.

* **title**
    * Type: `String`
    * Required: Yes
    * Validation: Max 100 characters.
* **content**
    * Type: `String`
    * Required: Yes
* **summary**
    * Type: `String`
    * Required: Yes
* **category**
    * Type: `String`
    * Required: Yes
    * Validation (Enum): Must be one of `technology`, `history`, or `news`.
* **level**
    * Type: `String`
    * Required: Yes
    * Validation (Enum): Must be one of `easy`, `medium`, or `hard`.
* **source\_id**
    * Type: `Types.ObjectId`
    * Required: Yes

---

## 📝 Source Article Schema

This is the data model for source articles stored in the `sourceArticle` collection, referenced by the `/source` endpoint.

* **title**
    * Type: `String`
    * Required: Yes
    * Validation: Max 100 characters.
* **content**
    * Type: `String`
    * Required: Yes
* **source\_url**
    * Type: `String`
    * Required: Yes
* **source**
    * Type: `String`
    * Required: Yes
    * Validation (Enum): Must be one of `BBC`.
* **published\_at**
    * Type: `Date`
    * Required: No

---

## 🛠️ Technology Stack

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **ODM:** [Mongoose](https://mongoosejs.com/)
* **Middleware:** [CORS](https://github.com/expressjs/cors), `express.json`
* **Environment:** [dotenv](https://github.com/motdotla/dotenv)