// Test mechanism necessary for repl.it.
// Uncomment to run testing on repl.it.
/*
const mocha = require('mocha')
const chai = require('chai')
const sinon = require('sinon')
const runner = new mocha({})
runner.addFile('./test/test.js')
runner.run(failures => {
  if (failures) {
    console.error(failures)
  } else {
    console.log('All passed.')
  }
})
*/
const transact = require('../src/transact.js');
// Transaction Management main routine.
transact.logMsg("Transaction Management\n");
transact.logMsg("Transaction Finished: Succeed = " + transact.executeTransaction( transact.placeOrder() ));