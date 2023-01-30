
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { REACT_APP_PUSHER_APP_INSTANCEID_BEAM } from '../config';
import catchError from '../services/catchError';

function usubscribeBeamAndLogout() {
    const beamsClient = new PusherPushNotifications.Client({
        instanceId: REACT_APP_PUSHER_APP_INSTANCEID_BEAM,
        });
      
        beamsClient.stop()
        .then(() => console.log('Beams SDK has been stopped'))
        .catch(e => console.error('Could not stop Beams SDK', e));

        beamsClient.clearAllState()
        .then(() => console.log('Beams state has been cleared'))
        .catch(e => console.error('Could not clear Beams state', e));
                
      localStorage.clear();
}

function startBeamClient() {
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: REACT_APP_PUSHER_APP_INSTANCEID_BEAM,
    });

    beamsClient.start()
    .then((beamsClient) => beamsClient.getDeviceId())
    .then((deviceId) => deviceId)
    .then(() => beamsClient.addDeviceInterest("update"))
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => interests).catch(err => console.log(err));
}


export {usubscribeBeamAndLogout, startBeamClient};