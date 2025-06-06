// pages/mensajes.tsx

import MessageCard from "./ui/message-card"

export default function Mensajes() {
  const mensajes = [
    {
      userId: '1',
      userName: 'Lucía Martínez',
      lastMessage: '¿Nos vemos mañana?',
      time: '10:45',
    },
    {
      userId: '2',
      userName: 'Carlos Gómez',
      lastMessage: 'Listo, ya lo envié.',
      time: '09:10',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-bgLigth">
      <h2 className="leftMediumTitle">Tus mensajes</h2>
      <div className="space-y-4">
        {mensajes.map((msg) => (
          <MessageCard key={msg.userId} {...msg} />
        ))}
      </div>
    </div>
  )
}
