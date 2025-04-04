export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.managedBaremetal.details.datacenters', {
    url: '/datacenter',
    reloadOnSearch: false,
    views: {
      pccView: 'ovhManagerPccDatacenters',
    },
    redirectTo: (transition) => {
      return transition
        .injector()
        .getAsync('hasVCDMigration')
        .then((hasVCDMigration) =>
          hasVCDMigration
            ? 'app.managedBaremetal.details.dashboard-light'
            : false,
        );
    },
    resolve: {
      addDatacenter: /* @ngInject */ ($state) => () =>
        $state.go('app.managedBaremetal.details.datacenters.add-datacenter'),
      goBack: /* @ngInject */ ($state, $timeout, productId, setMessage) => (
        message = false,
        type = 'success',
      ) => {
        const reload = message && type === 'success';

        const promise = $state.go(
          'app.managedBaremetal.details.datacenters',
          { productId },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() => $timeout(() => setMessage(message, type)));
        }

        return promise;
      },
      trackClick: /* @ngInject */ (atInternet, trackingPrefix) => (click) => {
        atInternet.trackClick({
          name: `${trackingPrefix}::details::${click}`,
          type: 'action',
        });
      },
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('managed_baremetal_datacenters'),
    },
  });
};
