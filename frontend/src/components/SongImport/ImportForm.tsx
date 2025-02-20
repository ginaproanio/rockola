import { FC, useState, useRef } from 'react'
import { parseCsvToSongs } from '../../utils/importUtils'
import { Song } from '../../types'
import { songService } from '../../services/songService'

interface ImportFormProps {
  onImportSuccess: (songs: Song[]) => void
  onImportError: (errors: string[]) => void
}

const ImportForm: FC<ImportFormProps> = ({ onImportSuccess, onImportError }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    try {
      setIsLoading(true)
      const text = await file.text()
      const { songs, errors } = parseCsvToSongs(text)
      
      if (errors.length > 0) {
        onImportError(errors)
        return
      }

      // Guardar las canciones usando el servicio
      const savedSongs = await Promise.all(
        songs.map(song => songService.createSong(song))
      )
      
      onImportSuccess(savedSongs)
    } catch (error) {
      onImportError(['Failed to process file'])
    } finally {
      setIsLoading(false)
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

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`p-8 border-2 border-dashed rounded-lg text-center 
        ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={handleClick}
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
      
      {isLoading ? (
        <div className="text-gray-600">
          <span className="animate-spin inline-block mr-2">⌛</span>
          Processing file...
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">
            Drag and drop a CSV file here, or click to select
          </p>
          <p className="text-sm text-gray-500">
            Only CSV files are supported
          </p>
        </div>
      )}
    </div>
  )
}

export default ImportForm
