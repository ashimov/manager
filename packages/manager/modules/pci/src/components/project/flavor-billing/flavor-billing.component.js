import controller from './flavor-billing.controller';
import template from './flavor-billing.html';
import './flavor-billing.scss';

export default {
  controller,
  template,
  bindings: {
    flavor: '<',
    number: '<?',
    monthlyBilling: '=?',
    disabled: '<?',
    addons: '<?',
    isLocalZone: '<',
    hourlyPriceInformation: '<',
    onChange: '&',
    beta: '<',
  },
  transclude: {
    hourlyPrice: '?pciProjectFlavorBillingHourlyPrice',
  },
};
