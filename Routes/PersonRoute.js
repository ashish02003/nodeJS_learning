const express = require("express");

const router = express.Router();
const PersonCollection = require("../Models/Person");

const { jwtAuthmiddleware, generateToken } = require("../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const person = new PersonCollection(data);
    const savedPerson = await person.save();

    const payload = {
      id: savedPerson.id,
      username: savedPerson.username,
    };

    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("Token is: ", token);
    res.status(200).json({ savedPerson: savedPerson, token: token });

    console.log("saved Data!!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login Route

router.post("/login", async (req, res) => {
  try {
    //Extract username and password from req body
    const { username, password } = req.body;

    //Find the user by username
    const user = await PersonCollection.findOne({ username: username });

    // If user does not exist or password does not match, return error
    if (!username || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //generate token
    const payload = {
      id: user.id,
      username: user.username,
    };

    //rerurn token as response
    const token = generateToken(payload);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Profile Route

router.get("/profile",jwtAuthmiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("userData :", userData);
    const userID = userData.id;
    const user = await PersonCollection.findById(userID);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Internal server error" });
  }
});

router.get("/", jwtAuthmiddleware, async (req, res) => {
  try {
    const data = await PersonCollection.find();
    res.status(200).json(data);
    console.log("fatched successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const workData = await PersonCollection.find({ work: workType });
      res.status(200).json(workData);
      console.log("fatched data successfully😎");
    } else {
      res.status(400).json({ Error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "internal server error" });
  }
});

//comments for testing purpose
module.exports = router;
