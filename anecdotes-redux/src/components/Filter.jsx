import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const handleChange = event => {
    const filter = event.target.value
    dispatch(filterChange(filter))
  }

  return (
    <div style={style}>
      <label htmlFor='filter'>
        Filter
      </label>
      <input
        id='filter'
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter