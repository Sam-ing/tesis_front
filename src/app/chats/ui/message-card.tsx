import Link from 'next/link'

interface MessageCardProps {
  userId: string
  userName: string
  lastMessage: string
  time: string
}

export default function MessageCard({
  userId,
  userName,
  lastMessage,
  time,
}: MessageCardProps) {
  return (
    <Link href={`chats/${userId}`}>
      <div className="bg-bgMedium hover:bg-bgDark transition rounded-lg p-4 shadow-md cursor-pointer flex justify-between items-center">
        <div>
          <h3 className="leftLigthSubTitle font-semibold">{userName}</h3>
          <p className="text-sm leftLigthParagraph truncate">{lastMessage}</p>
        </div>
        <span className="text-xs leftLigthParagraph">{time}</span>
      </div>
    </Link>
  )
}
