import controller from './logs-home.controller';
import template from './logs-home.html';

export default {
  bindings: {
    service: '<',
    accountDetails: '<',
    serviceInfos: '<',
    isAccountDisabled: '<',
    tokenIds: '<',
    defaultCluster: '<',
    dataUsage: '<',
    indexIds: '<',
    aliasIds: '<',
    encryptionKeysIds: '<',
  },
  controller,
  controllerAs: 'ctrl',
  template,
};
