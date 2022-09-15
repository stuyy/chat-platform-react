import { formatRelative } from 'date-fns'
import { FC, useContext } from 'react'
import { capitalizeFirstLetter } from '../../functions'
import { AuthContext } from '../../utils/context/AuthContext'
import { MessageItemHeaderContainer } from '../../utils/styles'
import { GroupMessageType, MessageType } from '../../utils/types'

type Props = {
  message: MessageType | GroupMessageType
}

export const MessageItemHeader: FC<Props> = ({ message }) => {

  // const { user } = useContext(AuthContext)
  const time = capitalizeFirstLetter(formatRelative(new Date(message.createdAt), new Date()))
  return (
    <MessageItemHeaderContainer>
      <span
        className="authorName"
        style={{
          color: "#ffff", // I guess white would be better //*user?.id === message.author.id ? '#989898' : '#5E8BFF'
        }}
      >
        {message.author.firstName} {message.author.lastName}
      </span>
      <span className="time">
        {time}
      </span>
    </MessageItemHeaderContainer>
  )
}
