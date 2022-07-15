const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { managerSignUp, managerLogin, addNewEmployee, updateEmployee, findEmployeesByCreatedBy, softDeleteEmployees } = require("./Handlers/EventHandlers");
const cors = require('cors');
const { isAuthorized } = require("./Middleware/authMiddleware");
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./Helper/documentation");
mongoose
  .connect("mongodb://127.0.0.1:27017/manager-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/documentation", swaggerDoc.serve);
    app.use("/documentation", swaggerDoc.setup(swaggerDocumentation ));
    
    app.use(cors());

    app.post("/api/manager/register/post", managerSignUp);
    app.get("/api/manager/login", managerLogin);
    app.post("/api/manager/createNewEmployee", isAuthorized, addNewEmployee);
    app.patch("/api/manager/updateEmployee", isAuthorized, updateEmployee);
    app.get("/api/manager/getEmployeesByCreatedBy", isAuthorized, findEmployeesByCreatedBy);
    app.patch("/app/manager/softDelete", isAuthorized, softDeleteEmployees);
    const port = 3000;
    app.listen(port, () => {
      console.log("connected to database.... server is running on port 3000");
    });
  });
