import express from 'express';
import bodyParser from 'body-parser';

let ControllerUtility = {
  makeController: function() {
    let controller = express();
    controller.use(bodyParser.json());
    return controller;
  }
};

export default ControllerUtility;
