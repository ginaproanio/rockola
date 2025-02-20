import { FC, useState, useRef } from 'react'
import { parseCsvToSongs } from '../../utils/importUtils'
import { Song } from '../../types'

interface ImportFormProps {
  onImportSuccess: (songs: Song[]) => void
  onImportError: (errors: string[]) => void
}

const ImportForm: FC<ImportFormProps> = ({ onImportSuccess, onImportError }) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    try {
      const text = await file.text()
      const { songs, errors } = parseCsvToSongs(text)
      
      if (errors.length > 0) {
        onImportError(errors)
        return
      }
      
      onImportSuccess(songs)
    } catch (error) {
      onImportError(['Failed to process file'])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'text/csv') {
      handleFile(file)
    } else {
      onImportError(['Please upload a CSV file'])
    }
  }

  return (
    <div
      className={`p-8 border-2 border-dashed rounded-lg text-center 
        ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
      
      <div className="space-y-4">
        <p className="text-lg">Drag and drop your CSV file here</p>
        <p className="text-sm text-gray-500">or</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Select File
        </button>
      </div>
    </div>
  )
}

export default ImportForm