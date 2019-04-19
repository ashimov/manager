import get from 'lodash/get';

export default class PciInstanceActiveMonthlyBillingController {
  /* @ngInject */
  constructor(
    $translate,
    CucCloudMessage,
    PciProjectsProjectInstanceService,
  ) {
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.PciProjectsProjectInstanceService = PciProjectsProjectInstanceService;
  }

  $onInit() {
    this.isLoading = false;
  }

  activeMonthlyBilling() {
    this.isLoading = true;
    return this.PciProjectsProjectInstanceService
      .activeMonthlyBilling(this.projectId, this.instance)
      .then(() => {
        this.CucCloudMessage.success(
          this.$translate.instant(
            'pci_projects_project_instances_instance_active-monthly-billing_success_message',
            {
              instance: this.instance.name,
            },
          ),
        );
      })
      .catch((err) => {
        this.CucCloudMessage.error(
          this.$translate.instant(
            'pci_projects_project_instances_instance_active-monthly-billing_error_enable',
            {
              message: get(err, 'data.message', null),
            },
          ),
        );
      })
      .finally(() => {
        this.isLoading = false;
        return this.goBack();
      });
  }
}
