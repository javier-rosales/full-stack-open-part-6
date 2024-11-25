import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter
      ? anecdotes.filter(anecdote => anecdote.content.includes(filter))
      : anecdotes
  })

  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const vote = anecdote => {
    dispatch(addVote(anecdote.id))
    dispatch(createNotification(`You voted for "${anecdote.content}"`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList