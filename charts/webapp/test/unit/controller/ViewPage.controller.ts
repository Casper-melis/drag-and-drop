/*global QUnit*/
import Controller from "sap/btp/charts/controller/View.controller";

QUnit.module("View Controller");

QUnit.test("I should test the View controller", function (assert: Assert) {
	const oAppController = new Controller("View");
	oAppController.onInit();
	assert.ok(oAppController);
});