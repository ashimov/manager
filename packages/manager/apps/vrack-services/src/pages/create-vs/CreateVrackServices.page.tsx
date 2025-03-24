import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ApiError, ApiResponse } from '@ovh-ux/manager-core-api';
import {
  useFeatureAvailability,
  ErrorBanner,
} from '@ovh-ux/manager-react-components';
import {
  getvrackServicesReferenceRegionList,
  getvrackServicesReferenceRegionListQueryKey,
  Region,
} from '@ovh-ux/manager-network-common';
import { RegionFormField } from './RegionFormField.component';
import { CreatePageLayout } from '@/components/layout-helpers';
import { urls } from '@/routes/routes.constants';

export default function CreateVrackServicesPage() {
  const [selectedRegion, setSelectedRegion] = React.useState('');
  const { t } = useTranslation('vrack-services/create');
  const navigate = useNavigate();
  const { data: features, isSuccess } = useFeatureAvailability([
    'vrack-services:order',
  ]);

  useEffect(() => {
    if (isSuccess && !features['vrack-services:order']) {
      navigate(urls.listing);
    }
  }, [isSuccess]);

  const {
    isLoading: isRegionLoading,
    isError: hasRegionError,
    error,
  } = useQuery<ApiResponse<Region[]>, ApiError>({
    queryKey: getvrackServicesReferenceRegionListQueryKey,
    queryFn: getvrackServicesReferenceRegionList,
    staleTime: Infinity,
  });

  if (hasRegionError) {
    return <ErrorBanner error={error} />;
  }

  return (
    <>
      <CreatePageLayout
        title={t('createPageTitle')}
        createButtonLabel={t('createButtonLabel')}
        confirmActionsTracking={['activate_vrack-service', selectedRegion]}
        onSubmit={() =>
          navigate(urls.createConfirm.replace(':region', selectedRegion))
        }
        isFormSubmittable={!isRegionLoading && !!selectedRegion}
      >
        <RegionFormField
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </CreatePageLayout>
      <Outlet />
    </>
  );
}
