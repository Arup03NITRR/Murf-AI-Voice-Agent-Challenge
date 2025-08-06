import { useEffect, useState } from 'react'
import Header from './components/Header'
import TextInputForm from './components/TextInputForm'
import AudioPlayer from './components/AudioPlayer'
import EchoBot from './components/EchoBot'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [audioUrl, setAudioUrl] = useState(null)

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }, [])

  const handleGenerateAudio = async (textInput) => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: textInput }),
    })

    const data = await response.json()
    setAudioUrl(data.audio_url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <Header message={message} />
        <TextInputForm onSubmit={handleGenerateAudio} />
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
        <EchoBot />
      </div>
    </div>
  )
}

export default App
