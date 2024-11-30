import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const addVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const handleVote = anecdote => {
    addVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `Anecdote "${anecdote.content}" voted!`
    })
    setTimeout(() =>
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    , 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return (
      <div>
        Loading data...
      </div>
    )
  }

  if (result.isError) {
    return (
      <div>
        Anecdote service not available due to problems in server
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.content}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>
              Vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App