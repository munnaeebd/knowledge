const compute = require('@google-cloud/compute');
const instancesClient = new compute.InstancesClient();
const operationsClient = new compute.ZoneOperationsClient();

async function waitForOperation(projectId, operation) {
  while (operation.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project: projectId,
      zone: operation.zone.split('/').pop(),
    });
  }
}

/**
 * Stops Compute Engine instances.
 *
 * Expects a PubSub message with JSON-formatted event data containing the
 * following attributes:
 *  zone - the GCP zone the instances are located in.
 *  label - the label of instances to stop.
 *
 * @param {!object} event Cloud Function PubSub message event.
 * @param {!object} callback Cloud Function PubSub callback indicating completion.
 */
exports.stopInstancePubSub = async (event, context, callback) => {
  try {
    const all_zones = ['asia-southeast1-b', 'asia-southeast1-a', 'asia-southeast1-c']
    const project = await instancesClient.getProjectId();
    const payload = _validatePayload(event);

    for(const all_zone of all_zones) {
      const options = {
        filter: `labels.${payload.label}`,
        project,
        zone: all_zone,
      };

      const [instances] = await instancesClient.list(options);

      await Promise.all(
        instances.map(async instance => {
          const [response] = await instancesClient.stop({
            project,
            zone: all_zone,
            instance: instance.name,
          });

          return waitForOperation(project, response.latestResponse);
        })
      );
    } 

    // Operation complete. Instance successfully stopped.
    const message = 'Successfully stopped instance(s)';
    console.log(message);
    callback(null, message);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

/**
 * Validates that a request payload contains the expected fields.
 *
 * @param {!object} payload the request payload to validate.
 * @return {!object} the payload object.
 */
const _validatePayload = event => {
  let payload;
  try {
    payload = JSON.parse(Buffer.from(event.data, 'base64').toString());
  } catch (err) {
    throw new Error('Invalid Pub/Sub message: ' + err);
  }
  if (!payload.label) {
    throw new Error("Attribute 'label' missing from payload");
  }
  return payload;
};
