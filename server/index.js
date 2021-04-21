const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

  var db = mysql.createConnection({
  user: "9ab8b7_pdnsa",
  host: "MYSQL5030.site4now.net",
  password: "a1tpdnsa",
  database: "db_9ab8b7_pdnsa",
});

db.on('error', function (err) {
  console.log('db error', err);  
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      db = mysql.createConnection({
      user: "9ab8b7_pdnsa",
      host: "MYSQL5030.site4now.net",
      password: "a1tpdnsa",
      database: "db_9ab8b7_pdnsa",
    });
  
  } else {
  throw err;
}});
  
app.get("/getAvtivities", (req, res)=> {
  db.query('SELECT ID, Activity_Name FROM activity_type ', function (error, results) {
    if (error) throw error;
   res.json(results);
});
});

app.get("/getCategories", (req, res)=> {
  db.query('SELECT category_name, ID FROM sfia_cat', function (error, results) {
    if (error) throw error;
   res.json(results);
});
});


app.post("/getSubCategories", (req, res) => {

  const id = req.body.main_category_id;
    db.query(
      "SELECT Subcategory_Name, ID FROM sfia_subcat Where ID_Cat=? ",
      id,
      (err, result) => {
        console.log(err);
        res.send(result);
      }
    );
  });

  app.get("/getSkills", (req, res)=> {
    db.query('SELECT Skill_Name, ID FROM sfia_skill', function (error, results) {
      if (error) throw error;
     res.json(results);
  });
  });

  app.post("/getSkillLevel", (req, res) => {

    const id = req.body.skill_level_id;
      db.query(
        "SELECT Level, ID FROM sfia_skill_level Where ID_Skill=? ",
        id,
        (err, result) => {
          console.log(err);
          res.send(result);
        }
      );
    });

    

    app.post("/submitRecord", (req, res) => {
      const uid = req.body.uid;
      const selected_avtivity_type=req.body.selected_avtivity_type;
      const selected_start_date=req.body.selected_start_date;
      const selected_duration=req.body.selected_duration;
      const selected_main_category=req.body.selected_main_category;
      const selected_sub_category=req.body.selected_sub_category;
      const selected_skill=req.body.selected_skill;
      const selected_skill_level=req.body.selected_skill_level;
      const selected_description=req.body.selected_description;
      const selected_active=req.body.selected_active;

        db.query(
          "INSERT INTO staff_record (ID_User, ID_Activity_Type, Activity_Date, Activity_Duration, ID_Skill_Level, Topic, Description, Active) VALUES(?,?,?,?,?,?,?,?)",
          [uid, selected_avtivity_type, selected_start_date, selected_duration, selected_skill_level, selected_main_category, selected_description, selected_active],
 
          (err, result) => {
            console.log(err);
            res.send(result);
          }
        );
      });


app.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  console.log("server loading")
  console.log(req.session.user)
  if (req.session.user) {
    res.send(req.session.user);
    console.log(req.session.user)
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});



app.listen(3001, () => {
  console.log("running server");
});
