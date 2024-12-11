import angular from 'angular';
import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import 'angular-translate';
import { region, iamProtectedData } from '@ovh-ux/manager-components';

import routing from './routing';
import component from './component';
import datacenterName from '../../component/datacenter-name/module';
import addNodes from './add-nodes';
import poweronNode from './poweron-node';

const moduleName = 'ovhManagerNutanixAllNodes';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
    region,
    datacenterName,
    iamProtectedData,
    addNodes,
    poweronNode,
  ])
  .config(routing)
  .component('nutanixAllNodes', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
