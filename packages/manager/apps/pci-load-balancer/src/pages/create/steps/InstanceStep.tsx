import { Translation, useTranslation } from 'react-i18next';
import { OsdsMessage, OsdsText } from '@ovhcloud/ods-components/react';
import {
  ODS_MESSAGE_TYPE,
  ODS_TEXT_LEVEL,
  ODS_TEXT_SIZE,
} from '@ovhcloud/ods-components';
import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming';
import { StepComponent, useMe } from '@ovh-ux/manager-react-components';
import { useContext } from 'react';
import { ShellContext } from '@ovh-ux/manager-react-shell-client';
import { useParams } from 'react-router-dom';
import { InstanceTable } from '@/components/create/InstanceTable.component';
import {
  GETTING_STARTED_LINK,
  LOAD_BALANCER_CREATION_TRACKING,
  MAX_INSTANCES_BY_LISTENER,
  MAX_LISTENER,
} from '@/constants';
import { StepsEnum, useCreateStore } from '@/pages/create/store';
import { useTrackStep } from '@/pages/create/hooks/useTrackStep';
import { useTranslatedLinkReference } from '@/hooks/useTranslatedLinkReference';

export const InstanceStep = (): JSX.Element => {
  const { t: tCommon } = useTranslation('pci-common');
  const { t: tCreate } = useTranslation('create');

  const { projectId } = useParams();

  const { trackStep } = useTrackStep();
  const { tracking } = useContext(ShellContext).shell;
  const instanceTrack = useTranslatedLinkReference();

  const store = useCreateStore();

  const { me } = useMe();

  return (
    <StepComponent
      title={tCreate('octavia_load_balancer_create_instance_title')}
      isOpen={store.steps.get(StepsEnum.INSTANCE).isOpen}
      isChecked={store.steps.get(StepsEnum.INSTANCE).isChecked}
      isLocked={store.steps.get(StepsEnum.INSTANCE).isLocked}
      order={5}
      next={{
        action: () => {
          trackStep(5);

          store.check(StepsEnum.INSTANCE);
          store.lock(StepsEnum.INSTANCE);

          store.open(StepsEnum.NAME);
        },
        label: tCommon('common_stepper_next_button_label'),
      }}
      edit={{
        action: () => {
          store.unlock(StepsEnum.INSTANCE);
          store.uncheck(StepsEnum.INSTANCE);
          store.open(StepsEnum.INSTANCE);
          store.reset(StepsEnum.NAME);
        },
        label: tCommon('common_stepper_modify_this_step'),
      }}
      skip={{
        action: () => {
          tracking.trackClick({
            name: LOAD_BALANCER_CREATION_TRACKING.SKIP_STEP_5,
            type: 'action',
          });
          store.set.listeners([]);

          store.check(StepsEnum.INSTANCE);
          store.lock(StepsEnum.INSTANCE);

          store.open(StepsEnum.NAME);
        },
        label: tCommon('common_stepper_skip_this_step'),
        hint: `${tCommon('common_stepper_optional_label')}`,
      }}
    >
      <Translation ns="create">
        {(_t) => (
          <OsdsText
            size={ODS_TEXT_SIZE._400}
            level={ODS_TEXT_LEVEL.body}
            color={ODS_THEME_COLOR_INTENT.text}
            className="mb-4"
          >
            <span
              ref={instanceTrack}
              dangerouslySetInnerHTML={{
                __html: _t('octavia_load_balancer_create_instance_intro', {
                  linkUrl:
                    GETTING_STARTED_LINK[me?.ovhSubsidiary] ||
                    GETTING_STARTED_LINK.DEFAULT,
                  trackLabel:
                    LOAD_BALANCER_CREATION_TRACKING.GO_TO_INSTANCE_DOCUMENTATION,
                }),
              }}
            ></span>
          </OsdsText>
        )}
      </Translation>
      <OsdsMessage
        className="mt-8"
        type={ODS_MESSAGE_TYPE.info}
        color={ODS_THEME_COLOR_INTENT.info}
      >
        <div className="grid grid-cols-1 gap-1">
          <p>
            <OsdsText
              size={ODS_TEXT_SIZE._400}
              level={ODS_TEXT_LEVEL.body}
              color={ODS_THEME_COLOR_INTENT.text}
            >
              {tCreate('octavia_load_balancer_create_instance_banner_text', {
                maxListeners: MAX_LISTENER,
                maxInstances: MAX_INSTANCES_BY_LISTENER,
              })}
            </OsdsText>
          </p>
          <p>
            <OsdsText
              size={ODS_TEXT_SIZE._400}
              level={ODS_TEXT_LEVEL.body}
              color={ODS_THEME_COLOR_INTENT.text}
            >
              <b>
                {tCreate(
                  'octavia_load_balancer_create_instance_banner_text_bold',
                )}
              </b>
            </OsdsText>
          </p>
          <p>
            <OsdsText
              size={ODS_TEXT_SIZE._400}
              level={ODS_TEXT_LEVEL.body}
              color={ODS_THEME_COLOR_INTENT.text}
            >
              {tCreate(
                'octavia_load_balancer_create_instance_banner_health_monitor_text',
              )}
            </OsdsText>
          </p>
        </div>
      </OsdsMessage>
      <InstanceTable
        className="mt-4"
        projectId={projectId}
        region={store.region?.name}
        onChange={(listeners) => {
          store.set.listeners(listeners);
        }}
      />
    </StepComponent>
  );
};
