import React from 'react';
import { OdsTag } from '@ovhcloud/ods-components/react';
import { ODS_TAG_COLOR } from '@ovhcloud/ods-components';
import { useTranslation } from 'react-i18next';
import { FilterTypeCategories } from '@ovh-ux/manager-core-api';
import { FilterWithLabel } from './interface';
import './translations';

export type FilterListProps = {
  filters: FilterWithLabel[];
  onRemoveFilter: (filter: FilterWithLabel) => void;
};

export function FilterList({
  filters,
  onRemoveFilter,
}: Readonly<FilterListProps>) {
  const { t, i18n } = useTranslation('filters');
  const tComp = (comparator: string) =>
    t(`common_criteria_adder_operator_${comparator}`);
  const locale = i18n.language?.replace('_', '-') || 'FR-fr';

  return (
    <>
      {filters?.map((filter, key) => (
        <OdsTag
          className="mr-3"
          color={ODS_TAG_COLOR.information}
          size="lg"
          key={key}
          onOdsRemove={() => onRemoveFilter(filter)}
          data-testid="filter-list_tag_item"
          label={`${
            filter.label ? `${filter.label} ${tComp(filter.comparator)} ` : ''
          }
          ${
            filter.type === FilterTypeCategories.Date
              ? new Date(`${filter.value}`).toLocaleDateString(locale)
              : `${filter.value}`
          }`}
        />
      ))}
    </>
  );
}
