import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    margin: '10px 0',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(({ notification }) => notification)

  return (
    notification
      ? (
        <div style={style}>
          {notification}
        </div>
      )
      : null
  )
}

export default Notification