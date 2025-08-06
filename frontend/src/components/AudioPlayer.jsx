function AudioPlayer({ audioUrl }) {
  return (
    <div className="mt-6 text-center">
      <audio controls src={audioUrl} className="w-full rounded-lg" />
    </div>
  )
}

export default AudioPlayer
