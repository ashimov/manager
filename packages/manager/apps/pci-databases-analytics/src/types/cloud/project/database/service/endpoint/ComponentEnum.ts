/** Defines all the values for the component in the service endpoints */
export enum ComponentEnum {
  'cassandra' = 'cassandra',
  'grafana' = 'grafana',
  'graphite' = 'graphite',
  'influxdb' = 'influxdb',
  'kafka' = 'kafka',
  'kafkaConnect' = 'kafkaConnect',
  'kafkaRestApi' = 'kafkaRestApi',
  'kafkaSASL' = 'kafkaSASL',
  'kafkaSchemaRegistry' = 'kafkaSchemaRegistry',
  'kibana' = 'kibana',
  'm3coordinator' = 'm3coordinator',
  'mongodb' = 'mongodb',
  'mongodbAnalytics' = 'mongodbAnalytics',
  'mongodbSrv' = 'mongodbSrv',
  'mongodbSrvAnalytics' = 'mongodbSrvAnalytics',
  'mysql' = 'mysql',
  'mysqlRead' = 'mysqlRead',
  'mysqlx' = 'mysqlx',
  'opensearch' = 'opensearch',
  'postgresql' = 'postgresql',
  'postgresqlRead' = 'postgresqlRead',
  'postgresqlReadReplica' = 'postgresqlReadReplica',
  'prometheusRead' = 'prometheusRead',
  'prometheusWrite' = 'prometheusWrite',
  'redis' = 'redis',
}