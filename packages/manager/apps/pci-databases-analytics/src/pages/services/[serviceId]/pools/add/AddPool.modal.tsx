import { useGetUsers } from '@/hooks/api/database/user/useGetUsers.hook';
import { useServiceData } from '../../Service.context';
import AddEditPool from '../_components/AddEditPool.component';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetConnectionPools } from '@/hooks/api/database/connectionPool/useGetConnectionPools.hook';
import { useGetDatabases } from '@/hooks/api/database/database/useGetDatabases.hook';

const AddPoolModal = () => {
  const { projectId, service } = useServiceData();
  const usersQuery = useGetUsers(projectId, service.engine, service.id, {
    enabled: !!service.id,
  });
  const databasesQuery = useGetDatabases(
    projectId,
    service.engine,
    service.id,
    {
      enabled: !!service.id,
    },
  );
  const connectionPoolsQuery = useGetConnectionPools(
    projectId,
    service.engine,
    service.id,
    {
      enabled: !!service.id,
    },
  );
  const users = usersQuery.data;
  const databases = databasesQuery.data;
  const connectionPools = connectionPoolsQuery.data;

  if (!users || !databases || !connectionPools)
    return <Skeleton className="w-full h-4" />;
  return (
    <AddEditPool
      service={service}
      connectionPools={connectionPools}
      databases={databases}
      users={users}
    />
  );
};

export default AddPoolModal;