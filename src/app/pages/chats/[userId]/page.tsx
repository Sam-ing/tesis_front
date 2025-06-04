// app/chat/[userId]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function ChatPage() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simular fetch de mensajes
    const fetchedMessages = [
      { id: 1, text: 'Hola!', from: 'otro' },
      { id: 2, text: '¿Cómo estás?', from: 'yo' },
    ]
    setMessages(fetchedMessages)
  }, [chatId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const msg = { id: Date.now(), text: newMessage, from: 'yo' }
    setMessages(prev => [...prev, msg])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Encabezado del chat */}
      <header className="bg-bgMedium text-white p-4">
        <h2 className="text-lg font-semibold">Chat ID: {chatId}</h2>
      </header>

      {/* Lista de mensajes */}
      <main className="flex-grow overflow-y-auto p-4 space-y-2 bg-bgLigth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.from === 'yo'
                ? 'ml-auto bg-bgDark text-white'
                : 'mr-auto bg-white text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      {/* Input para responder */}
      <footer className="p-4 bg-bgMedium shadow-md flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-grow bg-white text-tDark border rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleSend}
          className="buttonPrimary"
        >
          Enviar
        </button>
      </footer>
    </div>
  )
}
