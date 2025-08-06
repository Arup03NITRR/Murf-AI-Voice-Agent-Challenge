function Header({ message }) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">🎙️ Murf AI Voice Agent</h1>
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  )
}

export default Header
