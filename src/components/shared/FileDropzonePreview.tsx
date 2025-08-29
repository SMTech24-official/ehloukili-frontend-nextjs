
import React, { useCallback, useState } from 'react';
import { LucideUploadCloud, LucideFile, LucideX } from 'lucide-react';
import { toast } from 'sonner';

interface FileDropzoneProps {
  label: string;
  onFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  files?: File[];
  multiple?: boolean;
  accept?: string;
  fileLabelPrefix?: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

export default React.memo(function FileDropzone({
  label,
  onFiles,
  onRemoveFile,
  files = [],
  multiple = true,
  accept,
  fileLabelPrefix,
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateFiles = useCallback((files: File[]): File[] => {
    const validFiles: File[] = [];
    files.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File "${file.name}" exceeds 10MB limit.`);
      } else {
        validFiles.push(file);
      }
    });
    return validFiles;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        setIsUploading(true);
        const validFiles = validateFiles(Array.from(e.dataTransfer.files));
        if (validFiles.length > 0) {
          onFiles(validFiles);
        }
        setIsUploading(false);
      }
    },
    [onFiles, validateFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setIsUploading(true);
        const validFiles = validateFiles(Array.from(e.target.files));
        if (validFiles.length > 0) {
          onFiles(validFiles);
        }
        if (inputRef.current) {
          inputRef.current.value = ''; // Reset input to allow re-uploading same files
        }
        setIsUploading(false);
      }
    },
    [onFiles, validateFiles]
  );

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? 'border-primary-500 bg-gray-50' : 'border-gray-300'} ${isUploading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
        onDragOver={e => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
        role="button"
        aria-label={`Upload ${label}`}
        aria-disabled={isUploading}
      >
        <LucideUploadCloud className="w-8 h-8 mb-2 text-gray-400" />
        <p className="mb-1">
          Drag and drop files here, or click to{' '}
          <span className="underline text-primary-600">upload a file</span>
        </p>
        <span className="text-xs text-gray-500">{label}</span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>
      {files && files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${file.size}-${idx}`}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2"
            >
              <LucideFile className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="truncate text-sm flex-grow">
                {fileLabelPrefix ? `${fileLabelPrefix} ${idx + 1}` : file.name}
              </span>
              <button
                type="button"
                onClick={() => onRemoveFile(idx)}
                className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label={`Remove ${fileLabelPrefix ? `${fileLabelPrefix} ${idx + 1}` : file.name}`}
              >
                <LucideX className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});