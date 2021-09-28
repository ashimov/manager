import set from 'lodash/set';
import uniqueId from 'lodash/uniqueId';
import Chart from 'chart.js'; // eslint-disable-line

import template from './chartjs.html';

export default /* @ngInject */ () => ({
  restrict: 'A',
  scope: {
    pciChartjs: '=',
    utils: '=?',
    autoReload: '=?',
  },
  bindToController: true,
  controllerAs: '$ctrl',
  template,
  link(scope, element, attrs, controller) {
    const canvas = element.children().get(0);
    canvas.id = uniqueId('pciChartjs');
    set(controller, 'ctx', canvas.getContext('2d'));
  },
  controller: /* @ngInject */ function directiveController($scope) {
    const self = this;

    this.createChart = function createChart(data) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.chartInstance = new Chart(this.ctx, data || this.pciChartjs);
    };

    this.$onInit = function $onInit() {
      if (this.autoReload) {
        $scope.$watch('$ctrl.pciChartjs', (data) => {
          if (data) {
            this.utils.refresh();
          }
        });

        $scope.$watchCollection('$ctrl.pciChartjs.data.datasets', () => {
          this.utils.refresh();
        });

        $scope.$watchCollection('$ctrl.pciChartjs.data', () => {
          this.utils.refresh();
        });
      }

      this.utils = {
        refresh: () => {
          if (self.chartInstance) {
            self.chartInstance.update();
          } else {
            self.createChart(this.pciChartjs);
          }
        },
      };

      $scope.$on('destroy', () => {
        if (self.chartInstance) {
          self.chartInstance.destroy();
        }
      });
    };
  },
});
