var makePersonList = function () {
  var persons = [], nextId = 1;
  function addTestData() {
    addPerson("Lars");
    addPerson("Henrik");
  }
  function addPerson(name) {
    persons.push({id: nextId++, name: name})
  }

  return {
    addPerson: function (name) { addPerson(name);},
    getAll: function () { return persons;},
    deleteAll: function () {
      persons = [];
    },
    addTestData:function(){addTestData()}
  }
};

module.exports = makePersonList();