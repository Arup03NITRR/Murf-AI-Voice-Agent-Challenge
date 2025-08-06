import { useState } from 'react'

function TextInputForm({ onSubmit }) {
  const [textInput, setTextInput] = useState('')

  const handleClick = () => {
    if (textInput.trim()) {
      onSubmit(textInput)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="Enter text to synthesize..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        onClick={handleClick}
        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-all"
      >
        Generate Audio
      </button>
    </div>
  )
}

export default TextInputForm
