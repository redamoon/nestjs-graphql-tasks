import { Tooltip } from "@mui/material"
import { IconButton } from "@mui/material"
import DelteIcon from "@mui/icons-material/Delete"
import { useMutation } from "@apollo/client"
import { DELETE_TASK } from "../mutations/taskMutations"
import { GET_TASKS } from "../queries/taskQueries"
import { useNavigate } from "react-router-dom"

const DeleteTask = ({ id, userId }: { id: number, userId: number }) => {
  const [deleteTask] = useMutation<{ deleteTask: { id: number } }>(DELETE_TASK);
  const navigate = useNavigate()

  const handleAddTask = async () => {
    try {
      await deleteTask({
        variables: { id },
        refetchQueries: [{ query: GET_TASKS, variables: { userId } }]
      });
      alert('タスクが削除されました');
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        localStorage.removeItem('token');
        alert('トークンの有効期限がきれました。');
        navigate('/signin');
        return
      } else {
        alert('An error occurred. Please try again');
      }
      alert('タスクの削除に失敗しました。')
    }
  }
  return (
    <div>
      <Tooltip title="削除">
        <IconButton onClick={handleAddTask}>
          <DelteIcon color='action' />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default DeleteTask;