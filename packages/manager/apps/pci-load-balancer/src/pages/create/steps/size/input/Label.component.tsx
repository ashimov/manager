import { useTranslation } from 'react-i18next';
import { OsdsText } from '@ovhcloud/ods-components/react';
import { ODS_TEXT_LEVEL, ODS_TEXT_SIZE } from '@ovhcloud/ods-components';
import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming';
import { useCatalogPrice } from '@ovh-ux/manager-react-components';
import { TAddon } from '@/pages/create/store';

export const LabelComponent = ({
  item,
  isItemSelected,
}: Readonly<{
  item: TAddon;
  isItemSelected: boolean;
}>) => {
  const { t: tCreate } = useTranslation('load-balancer/create');

  const { getFormattedHourlyCatalogPrice } = useCatalogPrice();

  const [priceValue, priceUnit] = getFormattedHourlyCatalogPrice(
    item.price,
  ).split('/');

  return (
    <div className="p-4">
      <OsdsText
        size={ODS_TEXT_SIZE._400}
        level={ODS_TEXT_LEVEL.body}
        color={ODS_THEME_COLOR_INTENT.text}
        className={isItemSelected ? 'font-bold' : 'font-normal'}
      >
        {tCreate('octavia_load_balancer_create_size_flavour_title', {
          sizeCode: item.label,
        })}{' '}
      </OsdsText>
      <div className="mt-4 font-normal">
        <OsdsText
          size={ODS_TEXT_SIZE._400}
          level={ODS_TEXT_LEVEL.body}
          color={ODS_THEME_COLOR_INTENT.text}
        >
          {tCreate(
            `octavia_load_balancer_create_size_flavour_description_${item.code}`,
          )}{' '}
        </OsdsText>
      </div>
      <div className="mt-4 pt-4 text-center border-solid border-t border-0 border-[--ods-color-blue-200]">
        <OsdsText
          size={ODS_TEXT_SIZE._400}
          level={ODS_TEXT_LEVEL.body}
          color={ODS_THEME_COLOR_INTENT.text}
        >
          <span className="font-bold">{priceValue}</span>/{priceUnit}
        </OsdsText>
      </div>
    </div>
  );
};
