
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ImageViewerProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold text-slate-300 mb-3">{title}</h3>
      <div className="w-full aspect-square bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-700 shadow-lg">
        {isLoading ? (
          <LoadingSpinner />
        ) : imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-slate-500 flex flex-col items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm">Your photo will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
