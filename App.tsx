
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageViewer from './components/ImageViewer';
import { restorePhoto } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setRestoredImage(null);
    setError(null);
  };
  
  const handleRestoreClick = useCallback(async () => {
    if (!originalImage) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRestoredImage(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const restoredImageBase64 = await restorePhoto(base64, mimeType);
      setRestoredImage(`data:image/png;base64,${restoredImageBase64}`);
    } catch (err) {
      console.error(err);
      setError("Failed to restore the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);


  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl p-6 bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700">
          
          <ImageUploader onImageSelect={handleImageSelect} disabled={isLoading} />
          
          {error && (
            <div className="mt-4 text-center bg-red-500/20 text-red-400 p-3 rounded-lg">
              {error}
            </div>
          )}

          {originalImageUrl && (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageViewer title="Original Photo" imageUrl={originalImageUrl} />
                <ImageViewer title="Restored Photo" imageUrl={restoredImage} isLoading={isLoading} />
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleRestoreClick}
                  disabled={isLoading || !originalImage}
                  className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center mx-auto"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Restoring...
                    </>
                  ) : (
                    "Restore Photo"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
       <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
