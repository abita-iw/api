import ControllerUtility from './utilities/ControllerUtility';
import ImageController from './controllers/ImageController';
import ImageSizeController from './controllers/ImageSizeController';
import UserController from './controllers/UserController';
import PinController from './controllers/PinController';
import PinTypeController from './controllers/PinTypeController';
import TagController from './controllers/TagController';
import DescriptionController from './controllers/DescriptionController';
import AuthController from './controllers/AuthController';

let ApiApp = ControllerUtility.makeController();

ApiApp.use('/images', ImageController);
ApiApp.use('/imageSizes', ImageSizeController);

// ApiApp.all('/users', ControllerUtility.authenticateRequest);
ApiApp.use('/users', UserController);
ApiApp.use('/pins', PinController);
ApiApp.use('/pinTypes', PinTypeController);
ApiApp.use('/tags', TagController);
ApiApp.use('/descriptions', DescriptionController);
ApiApp.use('/auth', AuthController);

export default ApiApp;
