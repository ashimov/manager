import template from './template.html';

export default {
  bindings: {
    goToOrderHost: '<',
    goToReinstallHost: '<',
    goToRestartHost: '<',
    goToSetStateHost: '<',
    serviceName: '<',
  },
  template,
};
