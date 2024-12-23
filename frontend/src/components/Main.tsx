import { jwtDecode } from 'jwt-decode';
import Header from './Header';
import TaskTable from './TaskTable';
import { Payload } from '../types/payload';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../queries/taskQueries';
import { Task } from '../types/task';
import Loading from './Loading';
import { Stack, Typography } from '@mui/material';
import AddTask from './AddTask';

const Main = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode<Payload>(token!);
  const userId = decodedToken.sub;

  const { loaging, data, error } = useQuery<{ getTasks: Task[] }>(GET_TASKS, {
    variables: { userId }
  });

  return (
    <>
      <Header />
      <Stack spacing={4} direction='column' m={8} alignItems="center">
        {loaging && <Loading />}
        {error && <Typography color="red">An error occurred. Please try again.</Typography>}
        {!loaging && !error && (
          <>
            <AddTask userId={userId} />
            <TaskTable tasks={data?.getTasks} userId={userId} />
          </>
        )}
      </Stack>
    </>
  )
}

export default Main;