import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { OdsText, OdsTooltip } from '@ovhcloud/ods-components/react';
import {
  ODS_BUTTON_COLOR,
  ODS_BUTTON_SIZE,
  ODS_ICON_NAME,
  ODS_TEXT_PRESET,
} from '@ovhcloud/ods-components';
import {
  Datagrid,
  DatagridColumn,
  ManagerButton,
} from '@ovh-ux/manager-react-components';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  ButtonType,
  PageLocation,
  useOvhTracking,
} from '@ovh-ux/manager-react-shell-client';
import {
  useOverridePage,
  useDomains,
  useGenerateUrl,
  usePlatform,
  useOrganizationList,
} from '@/hooks';
import ActionButtonDomain from './ActionButtonDomain.component';
import LabelChip from '@/components/LabelChip';
import { IAM_ACTIONS } from '@/utils/iamAction.constants';
import { DATAGRID_REFRESH_INTERVAL, DATAGRID_REFRESH_ON_MOUNT } from '@/utils';
import Loading from '@/components/Loading/Loading';
import { DomainType } from '@/api/domain/type';
import { AccountStatistics, ResourceStatus } from '@/api/api.type';
import { BadgeStatus } from '@/components/BadgeStatus';
import { CnameBadge } from './CnameBadge.component';
import { ADD_DOMAIN } from '@/tracking.constant';

export type DomainsItem = {
  id: string;
  name: string;
  organizationId: string;
  organizationLabel: string;
  account: number;
  status: ResourceStatus;
  cnameToCheck?: string;
};

const columns: DatagridColumn<DomainsItem>[] = [
  {
    id: 'domains',
    cell: (item) => (
      <OdsText preset={ODS_TEXT_PRESET.paragraph}>{item.name}</OdsText>
    ),
    label: 'zimbra_domains_datagrid_domain_label',
  },
  {
    id: 'organization',
    cell: (item) => (
      <LabelChip id={item.organizationId}>{item.organizationLabel}</LabelChip>
    ),
    label: 'zimbra_domains_datagrid_organization_label',
  },
  {
    id: 'account',
    cell: (item) => (
      <OdsText preset={ODS_TEXT_PRESET.paragraph}>{item.account}</OdsText>
    ),
    label: 'zimbra_domains_datagrid_account_number',
  },
  {
    id: 'status',
    cell: (item) =>
      item.cnameToCheck && item.status === ResourceStatus.CREATING ? (
        <CnameBadge item={item} />
      ) : (
        <BadgeStatus itemStatus={item.status}></BadgeStatus>
      ),
    label: 'zimbra_domains_datagrid_status_label',
  },
  {
    id: 'tooltip',
    cell: (item: DomainsItem) => <ActionButtonDomain domainItem={item} />,
    label: '',
  },
];

export default function Domains() {
  const { t } = useTranslation('domains');
  const { trackClick } = useOvhTracking();
  const { platformUrn } = usePlatform();
  const navigate = useNavigate();
  const isOverridedPage = useOverridePage();

  const {
    data: domains,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useDomains({
    refetchInterval: DATAGRID_REFRESH_INTERVAL,
    refetchOnMount: DATAGRID_REFRESH_ON_MOUNT,
    enabled: !isOverridedPage,
  });

  const { data: organizations } = useOrganizationList({
    enabled: !isLoading && domains?.length === 0,
  });

  const hrefAddDomain = useGenerateUrl('./add', 'path');

  const handleAddDomainClick = () => {
    trackClick({
      location: PageLocation.page,
      buttonType: ButtonType.button,
      actionType: 'navigation',
      actions: [ADD_DOMAIN],
    });
    navigate(hrefAddDomain);
  };

  const items: DomainsItem[] = useMemo(() => {
    return (
      domains?.map((item: DomainType) => ({
        name: item.currentState?.name,
        id: item.id,
        organizationId: item.currentState?.organizationId,
        organizationLabel: item.currentState?.organizationLabel,
        account: item.currentState?.accountsStatistics.reduce(
          (acc: number, current: AccountStatistics) =>
            acc + current.configuredAccountsCount,
          0,
        ),
        status: item.resourceStatus,
        cnameToCheck: item.currentState?.expectedDNSConfig?.ownership?.cname,
      })) ?? []
    );
  }, [domains]);

  return (
    <div>
      <Outlet />
      {platformUrn && !isOverridedPage && (
        <>
          <div className="flex items-center justify-between">
            <div id="tooltip-trigger-domain-btn">
              <ManagerButton
                id="add-domain-btn"
                color={ODS_BUTTON_COLOR.primary}
                size={ODS_BUTTON_SIZE.sm}
                onClick={handleAddDomainClick}
                urn={platformUrn}
                iamActions={[IAM_ACTIONS.domain.create]}
                data-testid="add-domain-btn"
                className="mb-6"
                isDisabled={isLoading || organizations?.length === 0}
                icon={ODS_ICON_NAME.plus}
                label={t('zimbra_domains_add_domain_title')}
              />
            </div>
            {(isLoading || organizations?.length === 0) && (
              <OdsTooltip
                role="tooltip"
                triggerId={'tooltip-trigger-domain-btn'}
              >
                <OdsText preset={ODS_TEXT_PRESET.paragraph}>
                  {t('zimbra_domains_tooltip_need_organization')}
                </OdsText>
              </OdsTooltip>
            )}
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Datagrid
                columns={columns.map((column) => ({
                  ...column,
                  label: t(column.label),
                }))}
                items={items}
                totalItems={items.length}
                hasNextPage={!isFetchingNextPage && hasNextPage}
                onFetchNextPage={fetchNextPage}
              />
              {isFetchingNextPage && <Loading />}
            </>
          )}
        </>
      )}
    </div>
  );
}
