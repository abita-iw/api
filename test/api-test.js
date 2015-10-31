import chai from 'chai';
import supertest from 'supertest';
import { Promise } from 'es6-promise';
import _ from 'lodash';
import express from 'express';
import QueryUtility from '../app/utilities/QueryUtility';
import ApiApp from '../app/ApiApp';
import models from '../app/models/index';

let expect = chai.expect;
let API_PORT = 4001;

describe('REST API', function() {
  let api = supertest(`localhost:${API_PORT}/`);
  let testEmail = 'test@example.com';
  let testCaption = 'TEST_CAPTION';

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
    let newUserId = null;
    let newPinId = null;
    before (function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          newUserId = res.body.userId;
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
            .expect(201)
            .end(function(err, res) {
              if (err) return done(err);
              newPinId = res.body.pinId;
              return done();
            });
        });
    });

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

    it('Should add an image', function(done) {
      api
        .post('images')
        .type('form')
        .attach('file', './public/images/test.jpg')
        .field('userId', newUserId)
        .field('pinId', newPinId)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.all.keys(models.image);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM images where userId = ${newUserId} AND pinId = ${newPinId}`);
    });
  });

  describe('Users', function() {

    let newUserId = null;
    let newPinId = null;
    it('Should create a new user', function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          newUserId = res.body.userId;
          expect(res.body).to.have.all.keys(models.user)
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
            .expect(201)
            .end(function(err, res) {
              if (err) reject(err);
              newPinId = res.body.pinId;
              return done();
            });
        });
    });

    it('Should retrieve a single user', function(done) {
      api
        .get(`users/${newUserId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.all.keys(models.user);
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

    it('Should create a user star', function(done) {
      api
        .put(`users/${newUserId}/stars/${newPinId}`)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
    
    it('Should retrieve a list of user stars', function(done) {
      api
        .get(`users/${newUserId}/stars`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(user => {
            expect(user).to.have.all.keys(models.star);
          });
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
      QueryUtility.query(`DELETE FROM stars WHERE pinId = '${newPinId}' AND userId = '${newUserId}'`).then(function() {
        QueryUtility.query(`DELETE FROM pins WHERE pinId = '${newPinId}'`).then(function() {
          QueryUtility.query(`DELETE FROM users WHERE userId = '${newUserId}'`);
        });
      });
    });
  });

  describe('Pins', function() {

    let newPinId = null;
    let newUserId = null;
    before(function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(201)
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
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          newPinId = res.body.pinId;
          expect(res.body).to.have.all.keys(models.pin);
          return done();
        });
    });

    it('Should retrieve a single pin', function(done) {
      api
        .get(`pins/${newPinId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.all.keys(models.pin);
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


  });

  describe('Stars', function() {
    let newUserId = null;
    let newPinId = null;
    before (function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          newUserId = res.body.userId;
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
            .expect(201)
            .end(function(err, res) {
              if (err) reject(err);
              newPinId = res.body.pinId;
              return done();
            });
        });
    });

    it('Should star a pin', function(done) {
      api
        .put(`users/${newUserId}/stars/${newPinId}`)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should unstar a pin', function(done) {
      api
        .del(`users/${newUserId}/stars/${newPinId}`)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM stars WHERE userId = ${newUserId} AND pinId = ${newPinId}`);
    });
  });

  describe('Tags', function() {
    let testTag = 'TEST_TAG';
    let newTagId = null;
    it('Should create a new tag', function(done) {
      api
        .post('tags')
        .send({
          name: testTag
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          newTagId = res.body.tagId;
          expect(res.body).to.have.all.keys(models.tag);
          return done();
        });
    });

    it('Should retrieve a specific tag', function(done) {
      api
        .get(`tags/${newTagId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.all.keys(models.tag);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM tags WHERE name = '${testTag}'`);
    });
  });

  describe('Descriptions', function() {
    let descriptionText = 'TEST_DESCRIPTION';
    let newUserId = null;
    let newPinId = null;
    let newDescriptionId = null;
    before (function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          newUserId = res.body.userId;
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
            .expect(201)
            .end(function(err, res) {
              if (err) reject(err);
              newPinId = res.body.pinId;
              return done();
            });
        });
    });

    it('Should create a new description', function(done) {
      api
        .post('descriptions')
        .send({
          userId: newUserId,
          pinId: newPinId,
          text: descriptionText,
        })
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          newDescriptionId = res.body.descriptionId;
          expect(res.body).to.have.all.keys(models.description);
          return done();
        });
    });

    it('Should retrieve a single description', function(done) {
      api
        .get(`descriptions/${newDescriptionId}`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.all.keys(models.description);
          return done();
        });
    });

    it('Should update a description', function(done) {
      let newText = 'NEW DESCRIPTION TEXT';
      let newDescription = {
        descriptionId: newDescriptionId,
        pinId: newPinId,
        userId: newUserId,
        text: newText
      };
      api
        .put(`descriptions`)
        .send(newDescription)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.all.keys(models.description);
          expect(res.body.text).to.equal(newText);
          return done();
        });
    });

    it('Should delete a description', function(done) {
      api
        .del(`descriptions/${newDescriptionId}`)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM descriptions WHERE descriptionId = '${newDescriptionId}'`);
    });
  });

  describe('PinTypes', function() {
    it('Should retrieve a list of pin types', function(done) {
      api
        .get(`pinTypes`)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.forEach(pinType => expect (pinType).to.have.all.keys(models.pinType));
          return done();
        });
    })
  });

  after(function() {
    QueryUtility.query(`DELETE FROM pins WHERE caption = '${testCaption}'`).then(function() {
      QueryUtility.query(`DELETE FROM users WHERE email = '${testEmail}'`);
    });
  });

});
