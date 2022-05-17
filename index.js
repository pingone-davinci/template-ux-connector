const sdk = require('@skinternal/skconnectorsdk');
const { serr, logger } = require('@skinternal/skconnectorsdk');
const { get } = require('lodash');
const connectorManifest = require('./manifest/manifest');

const redisList = 'connectorUX';
/**
 * Performs the necessary processing to initialize the connector
 *
 */
const initialize = async () => {
  try {
    // Update Manifest
    if (get(process, 'argv[2]', null) === 'mode=update-manifest') {
      await sdk.manifestDeploy(connectorManifest);
      return;
    }
    // The real thing of note here: registers the connector with the SDK and subscribes to REDIS changes
    const response = await sdk.initalize(redisList);
    logger.info('Started connector-ux:', response);
  } catch (err) {
    logger.error('Error starting connector-ux');
    logger.error(err);
  }
};

const handle_capability_countdownCheck = async ({ id, properties }) => {
  // Add in any work to be done before presenting the UI
  logger.debug(properties);

  // TODO - add example capturing input from U
  return {
    action: 'sendUserView',
    payload: {
      id,
      properties,
    },
  };
};

const handle_capability_countdownCheck_continue = async ({ properties }) => {
  // Add in any work to be done before presenting the UI
  logger.debug(properties);

  return {
    output: {
      rawResponse: 'Capability Completed Successfully!',
      statusCode: '200',
    },
    eventName: 'continue',
  };
};

sdk.methods.handle_capability_countdownCheck = handle_capability_countdownCheck;
sdk.methods.handle_capability_countdownCheck_continue =
  handle_capability_countdownCheck_continue;

initialize();

module.exports = {
  handle_capability_countdownCheck,
  handle_capability_countdownCheck_continue,
};
