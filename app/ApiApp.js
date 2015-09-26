import ControllerUtility from './utilities/ControllerUtility';
import ImageController from './controllers/ImageController';
import ImageSizeController from './controllers/ImageSizeController';
import UserController from './controllers/UserController';
import PinController from './controllers/PinController';
import PinTypeController from './controllers/PinTypeController';

let ApiApp = ControllerUtility.makeController();

ApiApp.use('/images', ImageController);
ApiApp.use('/imageSizes', ImageSizeController);
ApiApp.use('/users', UserController);
ApiApp.use('/pins', PinController);
ApiApp.use('/pinTypes', PinTypeController);

export default ApiApp;
