'use strict';

const { MongoClient } = require('mongodb');

module.exports = dbUri => MongoClient.connect(dbUri);
