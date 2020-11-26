const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var multer = require('multer');
const { timeStamp } = require('console');
var upload = multer();

const doctordb = require("./database").doctor;
doctordb.doctor()

const pdb = require("./database").patient;
pdb.patient()

const apdb = require("./database").appointmentlist;
apdb.run()

const body = require('./Mail.js')
const mail = new body()

const tim = new require("./time")


var logged_in = []
var onduty = []
var runninglist = []

var port = 3000



//serve static files
app.use(express.static(__dirname))



//test use route only
app.get("/read", function (req, res) {
  console.log("read request")
  console.log(req.query.Email)
  res.send("here i9s the </br> response=" + req.ip)
  console.log(req.url)
})

//test use route only

app.get("/show", function (req, res) {
  console.log("show request")
  var show = pdb.show()
  console.log(show)
  res.send("l")
})

//setup for reading user inputs

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//new doctor route

app.post("/dnew/", function (req, res) {
  console.log("dnew request")
  console.log(req.body)
  doctordb.addp(req.body)
  res.redirect(301, '/doctorLogin.html');
  //res.sendFile(__dirname + '/AppointmentForm.html')
  //console.log(req.body.email)
})

//doctor login route


app.post("/dlogin/", function (req, res) {
  console.log("dlogin request")
  console.log(req.body)
  var found = doctordb.find(req.body.email, req.body.password)

  if (found === false) {
    res.send("invalid username or password")
  }
  else {
    res.redirect(301, '/doctorEntry.html');
    //res.sendFile(__dirname + '/AppointmentForm.html')
    onduty.push({ ip: req.ip, email: found.email, name: found.Fname, link: found.degree, password: req.body.password })
    console.log(onduty)
  }
  //console.log(found)
})

//show name for logged in doctors


app.get("/seeknamedoc", function (req, res) {
  console.log("doctor seekname request")
  var index = doctordb.findname(req.ip, onduty)
  if (index === false) {
    res.send("Not logged in")
  }
  else {
    res.send("Hello " + onduty[index].name)
    console.log(onduty[index].name)
  }
})

//start doctor duty


app.post("/startdoc", function (req, res) {
  console.log("doctor start request", req.body.link)
  var index = doctordb.findname(req.ip, onduty)
  console.log(onduty[index].name)
  if (index === false) {
    res.send("Not logged in")
  }
  else {
    //res.send("Hello started " + onduty[index].name)
    res.redirect(301, 'DAdisplay.html')
    runninglist.push({ details: doctordb.find(onduty[index].email, onduty[index].password), ip: req.ip, time: 0, appointments: [], link: req.body.link })
    console.log(runninglist)
  }
})

//

app.get("/seedocAppointments", function (req, res) {
  var index = doctordb.findname(req.ip, runninglist)
  if (index == -1) {
    res.send("you are not on duty")
  }
  if (index === false) {
    res.send([])
  }
  else {
    res.send(runninglist[index].appointments)
    // console.log(runninglist[index].appointments)
  }

}
)
//new patient route

app.post("/pnew/", function (req, res) {
  console.log("pnew request")
  console.log(req.body)
  pdb.addp(req.body)
  res.redirect(301, '/index.html');
  //res.sendFile(__dirname + '/AppointmentForm.html')
  //console.log(req.body.email)
})



//patient login route


app.post("/plogin/", function (req, res) {
  console.log("plogin request")
  console.log(req.body)
  var found = pdb.find(req.body.email, req.body.password)

  if (found === false) {
    res.send("invalid username or password")
  }
  else {
    res.redirect(301, '/PatientEntry.html');
    //res.sendFile(__dirname + '/AppointmentForm.html')
    logged_in.push({ ip: req.ip, email: found.email, name: found.Fname })
    console.log(logged_in)
  }
  //console.log(found)
})

//appointment requests

function look() {
  min = Date.now() + 60 * 60 * 1000
  var index = runninglist.findIndex(function (obj, index) {
    if (obj.time < min) {
      min = obj.time
      return false
    }
    return false
  })
  var index = runninglist.findIndex(function (obj, index) {
    if (obj.time == min) {
      return true
    }
    return false
  })

  return index
}

app.post("/Appointment_request", function (req, res) {
  console.log("Appointment request")
  console.log(req.body)
  var formfill = req.body
  var found = pdb.findname(req.ip, logged_in)

  if (found === false) {
    res.send("You are not logged in")
  }
  else {
    var select = look(runninglist)
    if (select === -1) {
      res.send("doctors busy")
    }
    else {
      if (runninglist[select].time == 0) {
        runninglist[select].time = Date.now()
      }
      runninglist[select].time += 15 * 60 * 1000
      var temp = {
        details: req.body,
        time: tim.setTime(runninglist[select].time),
        timestamp: runninglist[select].time,
        email: found.email
      }
      runninglist[select].appointments.push(temp)
      //res.send("name : " + runninglist[select].details.Fname + " " + runninglist[select].details.Lname+" </br>qualifications : " + runninglist[select].details.degree + "</br>link :"+runninglist[select].link+" </br>time :" + tim.setTime(runninglist[select].time))
      //runninglist.push(req.ip,onduty[select].name,onduty[select].degree)
      console.log(runninglist)
      console.log(runninglist[select].appointments)
      res.redirect(301, "PAdisplay.html")
      apdb.push({
        fname: runninglist[select].details.Fname,
        lname: runninglist[select].details.Lname,
        ip: req.ip, timestamp: runninglist[select].time,
        link: runninglist[select].link,
        degree: runninglist[select].details.degree,
        time: tim.setTime(runninglist[select].time)
      })

      //sending confirmations via mail

      //patient
      var mailOptions = {
        from: 'onlinedctr@gmail.com',
        to: found.email,
        subject: 'Sending Email using Node.js',
        html: ("<html><body>name=" + runninglist[select].details.Fname +
          " " + runninglist[select].details.Lname + " <br>qualifications : "
          + runninglist[select].details.degree + "<br>link :"
          + runninglist[select].link + " <br>time :" +
          tim.setTime(runninglist[select].time) + "</body></html>"
        )
      };
      mail.send(mailOptions)
      //doctor

      var mailOptions = {
        from: 'onlinedctr@gmail.com',
        to: runninglist[select].details.email,
        subject: 'Sending Email using Node.js',
        html: ("<html><body>name=" + temp.details.fname + " " + temp.details.lname + " <br>Age:"
          + temp.details.age + " <br>Chronic Disease: " + temp.details.chr_disease +
          " <br>Allergy: " + temp.details.allergy + "<br>Problem:  " +
          temp.details.problem + "<br>Date and Time: " + temp.time + "<br></body></html>"
        )
      };
      mail.send(mailOptions)
    }
  }
  //console.log(found)
})

//show name for logged in patients


app.get("/seekname", function (req, res) {
  console.log("seekname request")
  var name = pdb.findname(req.ip, logged_in)
  if (name === false) {
    res.send("Not logged in")
  }
  else {
    res.send("Hello " + name.name)
    console.log(name.name)
  }
})


//patient see appointments

app.get("/PatientSeeAppointments", function (req, res) {
  //console.log("patient see appointments request")
  var applst = apdb.show(req.ip)
  if (applst === false) {
    res.send([])
  }
  else {
    res.send(applst)
  }
})

setInterval(usless, 9000000);

function usless() {
  apdb.appointmentTimeOut();
}

app.listen(process.env.PORT || port)
console.log("listening on ", port)
 