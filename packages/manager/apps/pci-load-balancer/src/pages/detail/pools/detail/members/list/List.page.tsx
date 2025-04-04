import {
  Datagrid,
  FilterAdd,
  FilterList,
  useColumnFilters,
  useDataGrid,
  useNotifications,
  DatagridColumn,
  DataGridTextCell,
} from '@ovh-ux/manager-react-components';
import {
  OsdsButton,
  OsdsIcon,
  OsdsPopover,
  OsdsPopoverContent,
  OsdsSearchBar,
  OsdsSpinner,
} from '@ovhcloud/ods-components/react';
import {
  ODS_BUTTON_SIZE,
  ODS_BUTTON_VARIANT,
  ODS_ICON_NAME,
  ODS_ICON_SIZE,
  ODS_SPINNER_SIZE,
} from '@ovhcloud/ods-components';
import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming';
import { FilterCategories, FilterComparator } from '@ovh-ux/manager-core-api';
import { Suspense, useMemo, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePoolMembers } from '@/api/hook/usePoolMember';
import OperatingStatusComponent from '@/components/listing/OperatingStatus.component';
import ProvisioningStatusComponent from '@/components/listing/ProvisioningStatus.component';
import { TPoolMember } from '@/api/data/pool-member';
import ActionsComponent from '@/components/detail/pools/members/Actions.component';

export default function PoolMemberList() {
  const { t } = useTranslation([
    'pools/members/list',
    'pools/detail',
    'filter',
    'load-balancer',
  ]);

  const { projectId, region, poolId } = useParams();
  const { pagination, setPagination, sorting, setSorting } = useDataGrid();

  const navigate = useNavigate();
  const { clearNotifications } = useNotifications();
  const { filters, addFilter, removeFilter } = useColumnFilters();
  const [searchField, setSearchField] = useState('');
  const filterPopoverRef = useRef(undefined);

  const { paginatedPoolMembers, isPending } = usePoolMembers(
    projectId,
    poolId,
    region,
    pagination,
    sorting,
    filters,
  );

  const columns: DatagridColumn<TPoolMember>[] = useMemo(
    () => [
      {
        id: 'name',
        cell: (props: TPoolMember) => (
          <DataGridTextCell>{props.name}</DataGridTextCell>
        ),
        label: t('octavia_load_balancer_pools_detail_members_name'),
      },
      {
        id: 'address',
        cell: (props: TPoolMember) => (
          <DataGridTextCell>{props.address}</DataGridTextCell>
        ),
        label: t('octavia_load_balancer_pools_detail_members_address'),
      },
      {
        id: 'protocolPort',
        cell: (props: TPoolMember) => (
          <DataGridTextCell>{props.protocolPort}</DataGridTextCell>
        ),
        label: t('octavia_load_balancer_pools_detail_members_protocol_port'),
      },
      {
        id: 'provisioningStatus',
        cell: (props: TPoolMember) => (
          <ProvisioningStatusComponent
            status={props.provisioningStatus}
            className="w-fit"
          />
        ),
        label: t('load-balancer:octavia_load_balancer_provisioning_status'),
      },
      {
        id: 'operatingStatus',
        cell: (props: TPoolMember) => (
          <OperatingStatusComponent
            status={props.operatingStatus}
            className="w-fit"
          />
        ),
        label: t('load-balancer:octavia_load_balancer_operating_status'),
        isSortable: false,
      },
      {
        id: 'actions',
        cell: (props: TPoolMember) => (
          <div className="min-w-16">
            <ActionsComponent memberId={props.id} />
          </div>
        ),
        label: '',
        isSortable: false,
      },
    ],
    [t],
  );

  return (
    <>
      <div className="sm:flex items-center justify-between mt-4">
        <div>
          <OsdsButton
            size={ODS_BUTTON_SIZE.sm}
            variant={ODS_BUTTON_VARIANT.stroked}
            color={ODS_THEME_COLOR_INTENT.primary}
            className="xs:mb-0.5 sm:mb-0 inline-block"
            onClick={() => {
              clearNotifications();
              navigate('./create');
            }}
          >
            <OsdsIcon
              size={ODS_ICON_SIZE.xs}
              name={ODS_ICON_NAME.PLUS}
              className="mr-2"
              color={ODS_THEME_COLOR_INTENT.primary}
            />
            {t('octavia_load_balancer_pools_detail_members_add_manually')}
          </OsdsButton>
          <OsdsButton
            size={ODS_BUTTON_SIZE.sm}
            variant={ODS_BUTTON_VARIANT.stroked}
            color={ODS_THEME_COLOR_INTENT.primary}
            className="xs:mb-0.5 sm:mb-0 inline-block ml-1"
            onClick={() => {
              clearNotifications();
              navigate('../list/add-ip-instance');
            }}
          >
            <OsdsIcon
              size={ODS_ICON_SIZE.xs}
              name={ODS_ICON_NAME.PLUS}
              className="mr-2"
              color={ODS_THEME_COLOR_INTENT.primary}
            />
            {t(
              'pools/detail:octavia_load_balancer_pools_detail_add_ips_instances',
            )}
          </OsdsButton>
        </div>

        <div className="justify-between flex">
          <OsdsSearchBar
            className="w-[70%]"
            value={searchField}
            onOdsSearchSubmit={({ detail }) => {
              setPagination({
                pageIndex: 0,
                pageSize: pagination.pageSize,
              });
              addFilter({
                key: 'search',
                value: detail.inputValue,
                comparator: FilterComparator.Includes,
                label: '',
              });
              setSearchField('');
            }}
          />
          <OsdsPopover ref={filterPopoverRef}>
            <OsdsButton
              slot="popover-trigger"
              size={ODS_BUTTON_SIZE.sm}
              color={ODS_THEME_COLOR_INTENT.primary}
              variant={ODS_BUTTON_VARIANT.stroked}
            >
              <OsdsIcon
                name={ODS_ICON_NAME.FILTER}
                size={ODS_ICON_SIZE.xs}
                className="mr-2"
                color={ODS_THEME_COLOR_INTENT.primary}
              />
              {t('filter:common_criteria_adder_filter_label')}
            </OsdsButton>
            <OsdsPopoverContent>
              <FilterAdd
                columns={[
                  {
                    id: 'name',
                    label: t('octavia_load_balancer_pools_detail_members_name'),
                    comparators: FilterCategories.String,
                  },
                  {
                    id: 'address',
                    label: t(
                      'octavia_load_balancer_pools_detail_members_address',
                    ),
                    comparators: FilterCategories.String,
                  },
                  {
                    id: 'protocolPort',
                    label: t(
                      'octavia_load_balancer_pools_detail_members_protocol_port',
                    ),
                    comparators: FilterCategories.Numeric,
                  },
                ]}
                onAddFilter={(addedFilter, column) => {
                  setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                  });
                  addFilter({
                    ...addedFilter,
                    label: column.label,
                  });
                  filterPopoverRef.current?.closeSurface();
                }}
              />
            </OsdsPopoverContent>
          </OsdsPopover>
        </div>
      </div>

      <div className="my-5">
        <FilterList filters={filters} onRemoveFilter={removeFilter} />
      </div>

      {isPending ? (
        <OsdsSpinner
          inline
          size={ODS_SPINNER_SIZE.md}
          data-testid="List-spinner"
        />
      ) : (
        <Datagrid
          columns={columns}
          items={paginatedPoolMembers?.rows || []}
          totalItems={paginatedPoolMembers?.totalRows || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortChange={setSorting}
          className="overflow-x-visible"
        />
      )}
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}
