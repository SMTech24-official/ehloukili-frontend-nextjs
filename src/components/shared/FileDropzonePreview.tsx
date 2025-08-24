import React from 'react';
import { LucideUploadCloud, LucideFile } from 'lucide-react';

interface FileDropzoneProps {
  label: string;
  onFiles: (files: File[]) => void;
  files?: File[];
  multiple?: boolean;
  accept?: string;
  fileLabelPrefix?: string;
}

export default function FileDropzone({ label, onFiles, files = [], multiple = true, accept, fileLabelPrefix }: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? 'border-primary-500 bg-gray-50' : 'border-gray-300'}`}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{ cursor: 'pointer' }}
      >
        <LucideUploadCloud className="w-8 h-8 mb-2 text-gray-400" />
        <p className="mb-1">Drag and drop files here, or click to <span className="underline text-primary-600">upload a file</span></p>
        <span className="text-xs text-gray-500">{label}</span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
        />
      </div>
      {files && files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {files.map((file, idx) => (
            <div key={file.name + idx} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2">
              <LucideFile className="w-4 h-4 text-gray-400" />
              <span className="truncate text-sm">
                {fileLabelPrefix ? `${fileLabelPrefix} ${idx + 1}` : file.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
