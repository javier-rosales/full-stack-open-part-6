import { useNotificationDispatch } from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: error => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: error.response?.data?.message || error.message
      })
      setTimeout(() =>
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      , 5000)
    }
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: 'Anecdote added'
    })
    setTimeout(() =>
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    , 5000)
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm