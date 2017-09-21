var express = require('express');
var router = express.Router();
var persons = require("./model");
persons.addTestData();
router.get('/', function (req, res) {
  res.render('person.jade', { persons: persons.getAll() });
});

router.post('/', function (req, res) {
  var name = req.body.name;
  if (name) {
    persons.addPerson(name);
  }
  res.redirect("/mvc1");//We redirect to clear POST values
});

router.delete('/',function(req,res){
  persons.deleteAll();
})
module.exports = router;