import chai from 'chai';
import supertest from 'supertest';
import express from 'express';
import QueryUtility from '../app/utilities/QueryUtility';

import ApiApp from '../app/ApiApp';
import models from '../app/models/index';

let expect = chai.expect;
let API_PORT = 3001;

describe('REST API', function() {
  let api = supertest(`localhost:${API_PORT}/`);

  before(function(done) {
    let app = express();
    app.use('/', ApiApp);
    app.set('port', API_PORT);

    app.listen(API_PORT, function() {
      done();
    });
  });

  describe('Image Sizes', function() {
    it ('Should retrive a list of all image sizes', function(done) {
      api
        .get('imageSizes')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(imageSize => {
            expect(imageSize).to.have.all.keys(models.imageSize);
          });
          done();
        });
    })
  });

  describe('Images', function() {
    it('Should retrieve a list of all images', function(done) {
      api
        .get('images')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(image => {
            expect(image).to.have.all.keys(models.image);
          });
          return done();
        });
    });
  });

  describe('Users', function() {
    let testEmail = 'test@example.com';
    let newId = null;
    it('Should create a new user', function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          newId = res.body.userId;
          return done();
        });
    });

    it('Should retrieve a single user', function(done) {
      api
        .get(`users/${newId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Object);
          return done();
        });
    });

    it('Should retrieve a list of all users', function(done) {
      api
        .get('users')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(user => {
            expect(user).to.have.all.keys(models.user);
          });
          return done();
        });
    });

    it('Should retrieve a list of user stars', function(done) {
      api
        .get(`users/${newId}/stars`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(user => {
            expect(user).to.have.all.keys(models.star);
          });
          return done();
        })
    });

    it('Should delete a user', function(done) {
      api
        .del(`users/${newId}`)
        .expect(204)
        .end(function(err) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM users WHERE email = '${testEmail}'`);
    });
  });

  describe('Pins', function() {
    let testCaption = 'TEST_CAPTION';
    let newPinId = null;

    let testEmail = 'test@example.com';
    let newUserId = null;
    it('Should create a new user', function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          newUserId = res.body.userId;
          return done();
        });
    });

    it('Should create a new pin', function(done) {
      api
        .post('pins')
        .send({
          userId: newUserId,
          typeId: 1,
          latitude: 0,
          longitude: 0,
          description: 'test',
          caption: testCaption
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          newPinId = res.body.pinId;
          return done();
        });
    });

    it('Should retrieve a single pin', function(done) {
      api
        .get(`pins/${newPinId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should retrieve all pins', function(done) {
      api
        .get(`pins`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should delete a pin', function(done) {
      api
        .del(`pins/${newPinId}`)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should delete a user', function(done) {
      api
        .del(`users/${newUserId}`)
        .expect(204)
        .end(function(err) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM pins WHERE caption = '${testCaption}'`);
      QueryUtility.query(`DELETE FROM users WHERE email = '${testEmail}'`);
    });
  });

  describe('Stars', function() {
    let testEmail = 'test@example.com';
    let testCaption = 'TEST_CAPTION';
    let newUserId = null;
    let newPinId = null;
    it('Should create a new user', function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          newUserId = res.body.userId;
          return done();
        });
    });

    it('Should create a new pin', function(done) {
      api
        .post('pins')
        .send({
          userId: newUserId,
          typeId: 1,
          latitude: 0,
          longitude: 0,
          description: 'Test',
          caption: testCaption
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          newPinId = res.body.pinId;
          return done();
        });
    });

    it('Should star a pin', function(done) {
      api
        .put(`users/${newUserId}/star/${newPinId}`)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should unstar a pin', function(done) {
      api
        .del(`users/${newUserId}/star/${newPinId}`)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM pins WHERE caption = '${testCaption}'`);
      QueryUtility.query(`DELETE FROM users WHERE email = '${testEmail}'`);
    });
  });
});
