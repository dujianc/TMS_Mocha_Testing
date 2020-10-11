const transact = require('../src/transact.js');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
var testConclusions = []; // initialize the test conclusions array
const pass=true, fail=false, failToEnd=null; // values for test conclusions array
describe("Rollback Test Suite", function () {
  var randomSuccess = sinon.stub(transact, "randomSuccess"); // stub "randomSuccess" for all tests
  randomSuccess.callsFake( () => {
    let result = testConclusions.shift(); // shift next test result from test conclusions
    if (result == failToEnd) { // handle "fail to end" specially
      testConclusions.unshift(result); // unshift this back for infinite loop
      result=fail; // fail this and all remaining steps
    }
    return result;
  });
  it("1. CalculateTotal fails, no rollback", function () {
    testConclusions = [failToEnd]; // fail all tests
    this.timeout(30000); // allow 30 seconds
    transact.logMsg(); //newline
    transact.executeTransaction( transact.placeOrder() ); // try the transaction
    expect(randomSuccess.callCount).equals(3); // three consecutive failures expected
  });
  it("2. CalculateTotal succeeds, UpdateCoupon fails, rollback CalculateTotal", function () {
    testConclusions = [pass, failToEnd]; // pass first, fail all the rest
    this.timeout(30000); // allow 30 seconds
    randomSuccess.resetHistory(); // reset callCount back to 0
    transact.logMsg(); //newline
    transact.executeTransaction( transact.placeOrder() ); // try the transaction
    expect(randomSuccess.callCount).equals(4); // four consecutive tests expected
  });
  it("3. CalculateTotal & UpdateCoupon succeeds, ChargeVendor fails, rollback UpdateCoupon & CalculateTotal", function () {
    testConclusions = [pass, pass, failToEnd]; // pass first & second, fail all the rest
    this.timeout(30000); // allow 30 seconds
    randomSuccess.resetHistory(); // reset callCount back to 0
    transact.logMsg(); //newline
    transact.executeTransaction( transact.placeOrder() ); // try the transaction
    expect(randomSuccess.callCount).equals(5); // five consecutive tests expected
  });
  it("4. CalculateTotal, UpdateCoupon, and ChargeVendor succeeds, ChargeCreditCard fails, rollback ChargeVendor, UpdateCoupon, and CalculateTotal", function () {
    testConclusions = [pass, pass, pass, failToEnd]; // pass first second & third, fail all the rest
    this.timeout(30000); // allow 30 seconds
    randomSuccess.resetHistory(); // reset callCount back to 0
    transact.logMsg(); //newline
    transact.executeTransaction( transact.placeOrder() ); // try the transaction
    expect(randomSuccess.callCount).equals(6); // six consecutive tests expected
  });
  it("5. CalculateTotal, UpdateCoupon, ChargeVendor, ChargeCreditCard succeeds, SaveOrder fails, rollback ChargeCreditCard, ChargeVendor, UpdateCoupon, and CalculateTotal", function () {
    testConclusions = [pass, pass, pass, pass, failToEnd]; // pass first second third & fourth, fail all the rest
    this.timeout(30000); // allow 30 seconds
    randomSuccess.resetHistory(); // reset callCount back to 0
    transact.logMsg(); //newline
    transact.executeTransaction( transact.placeOrder() ); // try the transaction
    expect(randomSuccess.callCount).equals(7); // seven consecutive tests expected
  });
})