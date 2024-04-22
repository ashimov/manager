import { HEALTH_MONITOR_TYPE } from '../../constants';

export const HORIZON_LINK =
  'https://horizon.cloud.ovh.net/project/load_balancer';

export const BOUNDS = {
  MAX_RETRIES_DOWN: {
    MIN: 1,
    MAX: 10,
  },
  MAX_RETRIES: {
    MIN: 1,
    MAX: 10,
  },
  DELAY: {
    MIN: 1,
  },
  TIMEOUT: {
    MIN: 0,
  },
};

export const HEALTH_MONITOR_NAME_REGEX = /^[A-Za-z0-9_.-]+$/;
export const EXPECTED_STATUS_CODE_REGEX = /^([1-5][0-9]{2}(\s*,\s*[1-5][0-9]{2})*)$|^([1-5][0-9]{2}-[1-5][0-9]{2})$/;

export const POOL_HEALTH_MONITOR_TYPE = {
  http: [
    HEALTH_MONITOR_TYPE.HTTP,
    HEALTH_MONITOR_TYPE.HTTPS,
    HEALTH_MONITOR_TYPE.PING,
    HEALTH_MONITOR_TYPE.TCP,
    HEALTH_MONITOR_TYPE.TLSHELLO,
  ],
  https: [
    HEALTH_MONITOR_TYPE.HTTP,
    HEALTH_MONITOR_TYPE.HTTPS,
    HEALTH_MONITOR_TYPE.PING,
    HEALTH_MONITOR_TYPE.TCP,
    HEALTH_MONITOR_TYPE.TLSHELLO,
  ],
  proxy: [
    HEALTH_MONITOR_TYPE.HTTP,
    HEALTH_MONITOR_TYPE.HTTPS,
    HEALTH_MONITOR_TYPE.PING,
    HEALTH_MONITOR_TYPE.TCP,
    HEALTH_MONITOR_TYPE.TLSHELLO,
  ],
  proxyV2: [
    HEALTH_MONITOR_TYPE.HTTP,
    HEALTH_MONITOR_TYPE.HTTPS,
    HEALTH_MONITOR_TYPE.PING,
    HEALTH_MONITOR_TYPE.TCP,
    HEALTH_MONITOR_TYPE.TLSHELLO,
  ],
  sctp: [
    HEALTH_MONITOR_TYPE.HTTP,
    HEALTH_MONITOR_TYPE.SCTP,
    HEALTH_MONITOR_TYPE.TCP,
    HEALTH_MONITOR_TYPE.UDPCONNECT,
  ],
  tcp: [
    HEALTH_MONITOR_TYPE.HTTP,
    HEALTH_MONITOR_TYPE.HTTPS,
    HEALTH_MONITOR_TYPE.PING,
    HEALTH_MONITOR_TYPE.TCP,
    HEALTH_MONITOR_TYPE.TLSHELLO,
  ],
  udp: [
    HEALTH_MONITOR_TYPE.HTTP,
    HEALTH_MONITOR_TYPE.SCTP,
    HEALTH_MONITOR_TYPE.TCP,
    HEALTH_MONITOR_TYPE.UDPCONNECT,
  ],
};

export default {
  HORIZON_LINK,
  BOUNDS,
  HEALTH_MONITOR_NAME_REGEX,
  POOL_HEALTH_MONITOR_TYPE,
};
