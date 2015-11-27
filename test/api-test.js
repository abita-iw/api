import { expect } from 'chai';
import supertest from 'supertest';
import { Promise } from 'es6-promise';
import _ from 'lodash';
import express from 'express';
import QueryUtility from '../app/utilities/QueryUtility';
import TestUtility from '../app/utilities/TestUtility';
import ApiApp from '../app/ApiApp';
import models from '../app/models/index';
import { validateObject } from '../app/utilities/ValidationUtility';
import HttpStatusCodes from '../app/constants/HttpStatusCodes';
import PinService from '../app/services/PinService';
import UserService from '../app/services/UserService';
import JWTService from '../app/services/JWTService';

let API_PORT = 4001;

describe('REST API', function() {
  let api = supertest(`localhost:${API_PORT}/`);
  let testEmail = 'test@example.com';
  let testTitle = 'TEST_TITLE';
  let jwt = TestUtility.getTestJWT(testEmail);

  before(function(done) {
    let app = express();
    app.use('/', ApiApp);
    app.set('port', API_PORT);

    app.listen(API_PORT, function() {
      done();
    });
  });

  describe('Image Sizes', function() {
    it('Should retrive a list of all image sizes', function(done) {
      api
        .get('imageSizes')
        .expect('Content-Type', /json/)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(imageSize => {
            let validationResult = validateObject(imageSize, models.imageSize);
            expect(validationResult.isValid).to.equal(true);
          });
          done();
        });
    });
  });

  describe('Images', function() {
    let newUserId = null;
    let newPinId = null;
    let newImageId = null;
    before (function(done) {
      UserService.createUser({
        email: testEmail
      }).then(res => {
        newUserId = res.insertId;
        PinService.createPin({
          userId: newUserId,
          typeId: 1,
          latitude: 0,
          longitude: 0,
          title: testTitle
        }).then(res => {
          newPinId = res.insertId;
          return done();
        });
      }).catch(err => done(err));
    });

    it('Should retrieve a list of all images', function(done) {
      api
        .get('images')
        .set('X-JWT', jwt)
        .expect('Content-Type', /json/)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(image => {
            let validationResult = validateObject(image, models.image);
            expect(validationResult.isValid).to.equal(true);
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
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.image);
          expect(validationResult.isValid).to.equal(true);
          newImageId = res.body.imageId;
          return done();
        });
    });

    it('Should delete an image', function(done) {
      api
        .del(`images/${newImageId}`)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
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
    let testUserId = null;
    let jwt = null;

    before (function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.user);
          expect(validationResult.isValid).to.equal(true);
          newUserId = res.body.userId;
          jwt = JWTService.createToken(res.body);
          api
            .post('pins')
            .send({
              userId: newUserId,
              typeId: 1,
              latitude: 0,
              longitude: 0,
              title: testTitle
            })
            .expect(HttpStatusCodes.CREATED)
            .end(function(err, res) {
              if (err) return done(err);
              let validationResult = validateObject(res.body, models.pin);
              expect(validationResult.isValid).to.equal(true);
              newPinId = res.body.pinId;
              return done();
            });
        });
    });

    it('Should fail to create a new user with an invalid email', function(done) {
       api
        .post('users')
        .set('X-JWT', jwt)
        .send({
          email: 'test'
        })
        .expect(HttpStatusCodes.BAD_REQUEST)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should create a new user', function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          testUserId = res.body.userId;
          let validationResult = validateObject(res.body, models.user);
          expect(validationResult.isValid).to.equal(true);
          return done();
        });
    });

    it('Should retrieve a single user', function(done) {
      api
        .get(`users/${newUserId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.user);
          expect(validationResult.isValid).to.equal(true);
          return done();
        });
    });

    it('Should retrieve a list of all users', function(done) {
      api
        .get('users')
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(user => {
            let validationResult = validateObject(user, models.user);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    });

    it('Should create a user star', function(done) {
      api
        .put(`users/${newUserId}/stars/${newPinId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
    
    it('Should retrieve a list of user stars', function(done) {
      api
        .get(`users/${newUserId}/stars`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(user => {
            let validationResult = validateObject(user, models.star);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    });

    it('Should visit a pin', function(done) {
      api
        .put(`users/${newUserId}/visits/${newPinId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err) {
          if (err) return done(err);
          return done();
        });
    });

    it("Should get a user's visited pins", function(done) {
      api
        .get(`users/${newUserId}/visits`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(visitation => {
            let validationResult = validateObject(visitation, models.visitation);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    });

    it("Should get a user's descriptions", function(done) {
      api
        .get(`users/${newUserId}/descriptions`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(description => {
            let validationResult = validateObject(description, models.description);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    });

    it('Should delete a user', function(done) {
      api
        .del(`users/${newUserId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM users WHERE userId = '${testUserId}'`);
      Promise.all([
        QueryUtility.query(`DELETE FROM stars WHERE pinId = '${newPinId}' AND userId = '${newUserId}'`),
        QueryUtility.query(`DELETE FROM visitations WHERE pinId = '${newPinId}' AND userId = '${newUserId}'`)
      ]).then(function() {
        QueryUtility.query(`DELETE FROM pins WHERE pinId = '${newPinId}'`).then(function() {
          QueryUtility.query(`DELETE FROM users WHERE userId = '${newUserId}'`);
        });
      });
    });
  });

  describe('Pins', function() {
    let newPinId = null;
    let testPinId = null;
    let newUserId = null;
    let newTagId = null;
    let newLinkId = null;
    let jwt = null;
    let updatedTitle = 'UPDATED_TITLE';
    let testTag = 'TEST TAG';
    let testLink = 'TEST_LINK';
    before(function(done) {
      Promise.all([
        new Promise(function(resolve, reject) {
          api
           .post('users')
           .send({
             email: testEmail
           })
           .expect(HttpStatusCodes.CREATED)
           .end(function(err, res) {
             if (err) reject(err);
             let validationResult = validateObject(res.body, models.user);
             expect(validationResult.isValid).to.equal(true);
             newUserId = res.body.userId;
             jwt = JWTService.createToken(res.body);
             resolve();
           });
        }),
        new Promise(function(resolve, reject) {
          api
           .post('tags')
           .send({
             name: testTag
           })
           .expect(HttpStatusCodes.CREATED)
           .end(function(err, res) {
             if (err) reject(err);
             let validationResult = validateObject(res.body, models.tag);
             expect(validationResult.isValid).to.equal(true);
             newTagId = res.body.tagId;
             resolve();
           });
        })
      ]).then(function() {
        api
          .post('pins')
          .send({
            userId: newUserId,
            typeId: 1,
            latitude: 0,
            longitude: 0,
            title: testTitle
          })
          .expect(HttpStatusCodes.CREATED)
          .end(function(err, res) {
            if (err) return done(err);
            let validationResult = validateObject(res.body, models.pin);
            expect(validationResult.isValid).to.equal(true);
            newPinId = res.body.pinId;
            return done();
          });
      }).catch(function(err) {
        return done(err);
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
          title: testTitle
        })
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.pin);
          expect(validationResult.isValid).to.equal(true);
          testPinId = res.body.pinId;
          return done();
        });
    });

    it('Should retrieve a single pin', function(done) {
      api
        .get(`pins/${newPinId}`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.pin);
          expect(validationResult.isValid).to.equal(true);
          return done();
        });
    });

    it('Should update a pin', function(done) {
      api
        .put(`pins`)
        .send({
          pinId: newPinId,
          userId: newUserId,
          typeId: 1,
          latitude: 0,
          longitude: 0,
          title: updatedTitle
        })
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.pin);
          expect(validationResult.isValid).to.equal(true);
          expect(res.body.title).to.equal(updatedTitle);
          return done();
        });
    });

    it('Should retrieve all pins', function(done) {
      api
        .get(`pins`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.forEach(pin => {
            let validationResult = validateObject(pin, models.pin);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    });

    it('Should log a pin visit', function(done) {
      api
        .put(`pins/${newPinId}/visits/${newUserId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it("Should get a pin's visits", function(done) {
      api
        .get(`pins/${newPinId}/visits`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(visit => {
            let validationResult = validateObject(visit, models.visitation);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    });

    it('Should add a link to a pin', function(done) {
      api
        .post(`pins/${newPinId}/links`)
        .send({
          userId: newUserId,
          pinId: newPinId,
          link: testLink
        })
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          newLinkId = res.body.linkId;
          let validationResult = validateObject(res.body, models.link);
          expect(validationResult.isValid).to.equal(true);
          return done();
        });
    });

    it("Should get a pin's links", function(done) {
      api
        .get(`pins/${newPinId}/links`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).instanceof(Array);
          res.body.forEach(link => {
            let validationResult = validateObject(link, models.link);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    });

    it('Should flag a pin', function(done) {
      api
        .put(`pins/${newPinId}/flags/${newUserId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should un-flag a pin', function(done) {
      api
        .del(`pins/${newPinId}/flags/${newUserId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should tag a pin', function(done) {
      api
        .put(`pins/${newPinId}/tags/${newTagId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should un-tag a pin', function(done) {
      api
        .del(`pins/${newPinId}/tags/${newTagId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should star a pin', function(done) {
      api
        .put(`users/${newUserId}/stars/${newPinId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should unstar a pin', function(done) {
      api
        .del(`users/${newUserId}/stars/${newPinId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('Should delete a pin', function(done) {
      api
        .del(`pins/${testPinId}`)
        .set('X-JWT', jwt)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM pins WHERE pinId = ${testPinId}`);
      Promise.all([
        QueryUtility.query(`DELETE FROM links WHERE pinId = '${newPinId}'`),
        QueryUtility.query(`DELETE FROM tags WHERE tagId = '${newTagId}'`),
        QueryUtility.query(`DELETE FROM flags WHERE userId = ${newUserId} and pinId = ${newPinId}`),
        QueryUtility.query(`DELETE FROM stars WHERE userId = ${newUserId} AND pinId = ${newPinId}`),
        QueryUtility.query(`DELETE FROM visitations WHERE userId = ${newUserId} AND pinId = ${newPinId}`)
      ]).then(function() {
        QueryUtility.query(`DELETE FROM pins WHERE pinId = ${newPinId}`);
      }).then(function() {
        QueryUtility.query(`DELETE FROM users WHERE userId = ${newUserId}`);
      });
    });
  });

  describe('Tags', function() {
    let testTag = 'TEST_TAG_INSTANCE';
    let newTagId = null;
    it('Should create a new tag', function(done) {
      api
        .post('tags')
        .send({
          name: testTag
        })
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.tag);
          expect(validationResult.isValid).to.equal(true);
          newTagId = res.body.tagId;
          return done();
        });
    });

    it('Should retrieve a specific tag', function(done) {
      api
        .get(`tags/${newTagId}`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.tag);
          expect(validationResult.isValid).to.equal(true);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM tags WHERE name = '${testTag}'`);
    });
  });

  describe('Links', function() {
    let testLink = 'TEST_LINK_INSTANCE';
    let testLinkId = null;
    let newLinkId = null;
    let newUserId = null;
    let newPinId = null;

    before (function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.user);
          expect(validationResult.isValid).to.equal(true);
          newUserId = res.body.userId;
          api
            .post('pins')
            .send({
              userId: newUserId,
              typeId: 1,
              latitude: 0,
              longitude: 0,
              description: 'Test',
              title: testTitle
            })
            .expect(HttpStatusCodes.CREATED)
            .end(function(err, res) {
              if (err) return done(err);
              let validationResult = validateObject(res.body, models.pin);
              expect(validationResult.isValid).to.equal(true);
              newPinId = res.body.pinId;
              api
                .post('links')
                .send({
                  userId: newUserId,
                  pinId: newPinId,
                  link: testLink
                })
                .expect(HttpStatusCodes.CREATED)
                .end(function(err, res) {
                  if (err) return done(err);
                  let validationResult = validateObject(res.body, models.link);
                  expect(validationResult.isValid).to.equal(true);
                  newLinkId = res.body.linkId;
                  return done();
                })
            });
        });
    });

    it('Should create a new link', function(done) {
      api
        .post('links')
        .send({
          userId: newUserId,
          pinId: newPinId,
          link: testLink
        })
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.link);
          expect(validationResult.isValid).to.equal(true);
          testLinkId = res.body.linkId;
          return done();
        });
    });

    it('Should retrieve a specific link', function(done) {
      api
        .get(`links/${newLinkId}`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.link);
          expect(validationResult.isValid).to.equal(true);
          return done();
        });
    });

    it('Should delete a link', function(done) {
      api
        .del(`links/${testLinkId}`)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      QueryUtility.query(`DELETE FROM links WHERE link = '${testLink}'`).then(function() {
        QueryUtility.query(`DELETE FROM pins WHERE pinId = '${newPinId}'`).then(function() {
          QueryUtility.query(`DELETE FROM users WHERE userId = '${newUserId}'`);
        });
      });
    });
  });

  describe('Descriptions', function() {
    let descriptionText = 'TEST_DESCRIPTION';
    let newUserId = null;
    let newPinId = null;
    let newDescriptionId = null;
    let testDescriptionId = null;
    before (function(done) {
      api
        .post('users')
        .send({
          email: testEmail
        })
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.user);
          expect(validationResult.isValid).to.equal(true);
          newUserId = res.body.userId;
          api
            .post('pins')
            .send({
              userId: newUserId,
              typeId: 1,
              latitude: 0,
              longitude: 0,
              description: 'Test',
              title: testTitle
            })
            .expect(HttpStatusCodes.CREATED)
            .end(function(err, res) {
              if (err) return done(err);
              let validationResult = validateObject(res.body, models.pin);
              expect(validationResult.isValid).to.equal(true);
              newPinId = res.body.pinId;
              api
                .post('descriptions')
                .send({
                  userId: newUserId,
                  pinId: newPinId,
                  text: descriptionText
                })
                .expect(HttpStatusCodes.CREATED)
                .end(function(err, res) {
                  if (err) return done(err);
                  let validationResult = validateObject(res.body, models.description);
                  expect(validationResult.isValid).to.equal(true);
                  newDescriptionId = res.body.descriptionId;
                  return done();
                })
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
        .expect(HttpStatusCodes.CREATED)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.description);
          expect(validationResult.isValid).to.equal(true);
          testDescriptionId = res.body.descriptionId;
          return done();
        });
    });

    it('Should retrieve a single description', function(done) {
      api
        .get(`descriptions/${newDescriptionId}`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.description);
          expect(validationResult.isValid).to.equal(true);
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
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          let validationResult = validateObject(res.body, models.description);
          expect(validationResult.isValid).to.equal(true);
          expect(res.body.text).to.equal(newText);
          return done();
        });
    });

    it('Should delete a description', function(done) {
      api
        .del(`descriptions/${testDescriptionId}`)
        .expect(HttpStatusCodes.NO_CONTENT)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    after(function() {
      Promise.all([
        QueryUtility.query(`DELETE FROM descriptions WHERE descriptionId = '${newDescriptionId}'`),
        QueryUtility.query(`DELETE FROM descriptions WHERE descriptionId = '${testDescriptionId}'`)
      ]).then(function() {
        QueryUtility.query(`DELETE FROM pins WHERE pinId = ${newPinId}`);
      }).then(function() {
        QueryUtility.query(`DELETE FROM users WHERE userId = ${newUserId}`);
      });
    });
  });

  describe('PinTypes', function() {
    it('Should retrieve a list of pin types', function(done) {
      api
        .get(`pinTypes`)
        .expect(HttpStatusCodes.OK)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.forEach(pinType => {
            let validationResult = validateObject(pinType, models.pinType);
            expect(validationResult.isValid).to.equal(true);
          });
          return done();
        });
    })
  });

  after(function() {
    QueryUtility.query(`DELETE FROM pins WHERE title = '${testTitle}'`).then(function() {
      QueryUtility.query(`DELETE FROM users WHERE email = '${testEmail}'`);
    });
  });

});

