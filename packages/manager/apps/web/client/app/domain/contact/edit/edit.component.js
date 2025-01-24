import controller from './edit.controller';
import template from './edit.html';

export default {
  controller,
  template,
  bindings: {
    goBack: '<',
    contactId: '<',
    contactInformations: '<',
    domainName: '<',
  },
};
