
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  disabled: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  }, [onImageSelect, disabled]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <div className="w-full">
      <label
        htmlFor="photo-upload"
        className={`relative block w-full border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-brand-primary transition-colors ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          disabled={disabled}
        />
        {preview ? (
            <div className="relative">
                <img src={preview} alt="Preview" className="mx-auto max-h-40 rounded-lg shadow-md" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white font-semibold">Choose another photo</p>
                </div>
            </div>
        ) : (
          <div className="flex flex-col items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-brand-primary">Click to upload</span> or drag and drop
            <p className="text-xs mt-1">PNG, JPG, WEBP, etc.</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
