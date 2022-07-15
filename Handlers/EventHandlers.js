const Managers = require("../UploadShema/managerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employees = require("../UploadShema/employeeSchema");

require("dotenv").config();

const managerSignUp = (req, res) => {
  try {
    var newManager = new Managers(req.body);
    newManager.hash_password = bcrypt.hashSync(req.body.password, 10);
    newManager.save(function (err, manager) {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      } else {
        manager.hash_password = undefined;
        return res.json(manager);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};

const managerLogin = (req, res) => {
  try {
    Managers.findOne({ email: req.query.email }, (err, data) => {
      if (err) console.log(err);

      if (
        !data ||
        !bcrypt.compareSync(req.query.password, data.hash_password)
      ) {
        return res.status(401).json({
          message: "Authentication failed... Invalid user or password",
        });
      }

      return res.json({
        token: jwt.sign(
          { email: data.email, _id: data._id },
          process.env.ACCESS_TOKEN
        ),
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

const addNewEmployee = (req, res) => {
  try{
    var newEmployee = new Employees(req.body); 
    
    newEmployee.isActive = true;
    newEmployee.createdBy = req.payload._id; 
    
    newEmployee.save(function(error, employee){
      if(error) return res.status(400).send({
        message: "validation error!!! please checkout your details!",
      });
      
      res.status(200).json(employee);

    })
  }catch(error){res.send(error)};
}


const updateEmployee = async (req, res) => {
  try{  
   
    const filter = {
      _id: req.query.id
    };
    const newUpdate = req.body; 

    const newUpdated_doc = await Employees.findByIdAndUpdate(filter, newUpdate, {new:true, runValidators: true});

    if(!newUpdated_doc){
      res.status(404).json({success: false, message: "user Not Found"});
    }

    res.status(200).json({
      success: true, message: "Updated Successfully"
    })
   
    

  }catch(error){
    res.send(error);
  }
} 

const findEmployeesByCreatedBy = (req, res) => {
  const filter = {
     createdBy: req.payload._id,
     isActive: true
  };
  

  Employees.find(filter, (error, Emp_data)=>{
    if(error) res.send(404).send("Not found");

    res.status(200).json(Emp_data);
  })

  // res.send("in Progress")
}

const softDeleteEmployees =async (req, res)=>{
  const filter = {
    _id: req.query.id
  };
  
  const softDelete = req.body;
  console.log(softDelete);

  const isDeleted_doc = await Employees.findByIdAndUpdate(filter, softDelete, {
    new: true
  });

  if(!isDeleted_doc){
    res.status(404).send("user not found!!!")
  }

  res.status(200).send("deleted successfully");
  
}


module.exports = {
  managerSignUp,
  managerLogin,
  addNewEmployee,
  updateEmployee,
  findEmployeesByCreatedBy,
  softDeleteEmployees
};
