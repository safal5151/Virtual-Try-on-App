
import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  id: string;
  title: string;
  onImageUpload: (base64: string, mimeType: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        const base64Data = result.split(',')[1];
        onImageUpload(base64Data, file.type);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const onAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-dashed border-gray-600 h-full flex flex-col">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-200">{title}</h3>
      <div 
        className={`flex-grow flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ${isDragging ? 'bg-purple-900/30 border-purple-400' : 'bg-gray-900/30'}`}
        onClick={onAreaClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
        />
        {imagePreview ? (
          <img src={imagePreview} alt={title} className="max-h-full max-w-full object-contain rounded-md p-2" />
        ) : (
          <div className="text-center text-gray-500 p-4">
            <UploadIcon className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Click to upload or drag & drop</p>
            <p className="text-sm">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
