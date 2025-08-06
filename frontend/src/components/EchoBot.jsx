import { useState, useRef } from 'react'

function EchoBot() {
  const [recording, setRecording] = useState(false)
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const mediaStreamRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setRecordedAudioUrl(audioUrl)

        // Free the microphone
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop())
          mediaStreamRef.current = null
        }
      }

      mediaRecorder.start()
      setRecording(true)
    } catch (err) {
      alert('Microphone access denied or not supported')
      console.error(err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  const clearRecording = () => {
    setRecordedAudioUrl(null)
    audioChunksRef.current = []
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">🎧 Echo Bot</h1>

      {/* Listening animation */}
      {recording && (
        <div className="mb-4 text-red-600 text-lg font-semibold animate-pulse flex items-center justify-center gap-2">
          <span role="img" aria-label="mic">🎙️</span> Listening...
        </div>
      )}

      {/* Centered Start/Stop buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={startRecording}
          disabled={recording}
          className={`px-5 py-2 rounded-lg transition-all ${recording ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className={`px-5 py-2 rounded-lg transition-all ${!recording ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
        >
          Stop Recording
        </button>
      </div>

      {/* Playback + Remove */}
      {recordedAudioUrl && (
        <div className="mt-6 text-center">
          <audio controls src={recordedAudioUrl} className="w-full rounded-lg mb-4" />
          <div className="flex justify-center">
            <button
              onClick={clearRecording}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-all"
            >
              Remove Recording
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EchoBot
