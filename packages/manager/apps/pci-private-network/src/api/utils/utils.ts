import { PaginationState } from '@ovhcloud/manager-components';
import { TRegion } from '@/api/data/regions';

export const getLocalZoneRegions = (customerRegions: TRegion[] = []) =>
  customerRegions?.filter(({ type }) => type.includes('localzone')) || [];

export const isLocalZoneRegion = (regions: TRegion[], regionName: string) =>
  regions.some((region) => region.name === regionName);

export const paginateResults = <T>(
  items: T[],
  pagination: PaginationState,
) => ({
  rows: items.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize,
  ),
  pageCount: Math.ceil(items.length / pagination.pageSize),
  totalRows: items.length,
});

const maxRandomNumber = 9999;

const getDate = () => {
  const date = new Date();
  return `${date.getDate()}${date.getMonth() + 1}`;
};

const getRandomNumber = () =>
  (Math.floor(Math.random() * maxRandomNumber) * new Date().getMilliseconds()) %
  maxRandomNumber;

export const getAutoGeneratedName = (prefix = ''): string => {
  const date = getDate();
  const randomNumber = getRandomNumber();
  const prefixPart = prefix ? `${prefix}-` : '';

  return `${prefixPart}${date}-${randomNumber}`;
};