const chai = require('chai');
const chaiSubset = require('chai-subset');
const models = require('../models');
const lib = require('../lib');
const routes = require('../routes');
const errors = require('../errors');
const services = require('../services');

chai.use(chaiSubset);

const testServerPort = 4999;

const { expect } = chai;

module.exports = {
  expect,
  models,
  lib,
  routes,
  errors,
  services,
  testServerPort,
};
