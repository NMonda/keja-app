const mongoose = require('mongoose');
const { expect, models, lib } = require('../setup');
const user = require('../fixtures/user').createFake();

const { User } = models;
const { Db } = lib;
const { MONGODB_URI, DB_NAME } = process.env;

describe('Models', () => {
  describe('User', () => {
    let db;

    beforeEach(async () => {
      db = new Db(`${MONGODB_URI}/${DB_NAME}`);
      await db.connect();
    });

    afterEach(async () => {
      await db.disconnect();
    });

    describe('validations', () => {
      describe('Success', () => {
        it('it creates new user', async () => {
          const newUser = new User(user);
          const result = await newUser.save();
          expect(result._id).not.to.equal('');
          expect(result._id instanceof mongoose.mongo.ObjectId).to.eq(true);
        });
      });

      describe('Failure', () => {
        it('fails when email is not provided', async () => {
          try {
            const invalidSchema = {
              ...user,
              email: null,
            };

            await new User(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: email/i);
          }
        });

        it('fails when password is not provided', async () => {
          try {
            const invalidSchema = {
              ...user,
              password: null,
            };

            await new User(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: password/i);
          }
        });

        it('fails when name is not provided', async () => {
          try {
            const invalidSchema = {
              ...user,
              name: null,
            };

            await new User(invalidSchema).save();
          } catch (error) {
            expect(error.name).to.equal('ValidationError');
            expect(error.message).to.match(/validation failed: name/i);
          }
        });
      });
    });
  });
});
