import {
  ODS_THEME_COLOR_INTENT,
  ODS_THEME_TYPOGRAPHY_SIZE,
} from '@ovhcloud/ods-common-theming';
import {
  ODS_TEXT_LEVEL,
  OdsBreadcrumbAttributeItem,
} from '@ovhcloud/ods-components';
import { OsdsBreadcrumb, OsdsText } from '@ovhcloud/ods-components/react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import {
  isDiscoveryProject,
  OnboardingLayout,
  PciDiscoveryBanner,
  RedirectionGuard,
  useProject,
  useProjectUrl,
} from '@ovhcloud/manager-components';
import { Suspense } from 'react';
import { useWorkflows } from '@/api/hooks/workflows';

export default function OnBoardingPage() {
  const { t } = useTranslation();
  const { t: tOnBoarding } = useTranslation('onboarding');
  const { projectId } = useParams();
  const { data: project } = useProject(projectId);
  const urlProject = useProjectUrl('public-cloud');
  const navigate = useNavigate();
  const { data: workflows, isPending } = useWorkflows(projectId);

  const breadcrumbItems: OdsBreadcrumbAttributeItem[] = [
    {
      href: urlProject,
      label: project?.description,
    },
    {
      label: t('pci_workflow_title'),
    },
  ];

  return (
    <RedirectionGuard
      isLoading={isPending}
      route={`/pci/projects/${projectId}/workflow`}
      condition={workflows?.length > 0}
    >
      {project && <OsdsBreadcrumb items={breadcrumbItems} />}

      {project && isDiscoveryProject(project) && (
        <div className="mb-8">
          <PciDiscoveryBanner projectId={projectId} />
        </div>
      )}
      <OnboardingLayout
        title={t('pci_workflow_title')}
        description={
          <>
            <OsdsText
              color={ODS_THEME_COLOR_INTENT.text}
              level={ODS_TEXT_LEVEL.body}
              size={ODS_THEME_TYPOGRAPHY_SIZE._400}
              className="mt-8 block"
            >
              {tOnBoarding('pci_workflow_onboarding_content1')}
            </OsdsText>
            <OsdsText
              color={ODS_THEME_COLOR_INTENT.text}
              level={ODS_TEXT_LEVEL.body}
              size={ODS_THEME_TYPOGRAPHY_SIZE._500}
              className="mt-6 block"
            >
              {tOnBoarding('pci_workflow_onboarding_content2')}
            </OsdsText>
            <OsdsText
              color={ODS_THEME_COLOR_INTENT.text}
              level={ODS_TEXT_LEVEL.body}
              size={ODS_THEME_TYPOGRAPHY_SIZE._400}
              className="mt-6 block"
            >
              {tOnBoarding('pci_workflow_onboarding_content3')}
            </OsdsText>
            <OsdsText
              color={ODS_THEME_COLOR_INTENT.text}
              level={ODS_TEXT_LEVEL.body}
              size={ODS_THEME_TYPOGRAPHY_SIZE._400}
              className="mt-6 block"
            >
              {tOnBoarding('pci_workflow_onboarding_content4')}
            </OsdsText>
            <OsdsText
              color={ODS_THEME_COLOR_INTENT.text}
              level={ODS_TEXT_LEVEL.body}
              size={ODS_THEME_TYPOGRAPHY_SIZE._400}
              className="mt-6 block"
            >
              {tOnBoarding('pci_workflow_onboarding_content5')}
            </OsdsText>
            <OsdsText
              color={ODS_THEME_COLOR_INTENT.text}
              level={ODS_TEXT_LEVEL.body}
              size={ODS_THEME_TYPOGRAPHY_SIZE._500}
              className="mt-6 block"
            >
              {tOnBoarding('pci_workflow_onboarding_no_instance')}
            </OsdsText>
          </>
        }
        orderButtonLabel={tOnBoarding(
          'pci_workflow_onboarding_create_instance',
        )}
        onOrderButtonClick={() => navigate(`../new`)}
      />
      <Suspense>
        <Outlet />
      </Suspense>
    </RedirectionGuard>
  );
}
