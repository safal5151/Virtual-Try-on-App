
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import { generateVirtualTryOn } from './services/geminiService';
import { LoadingSpinner, MagicWandIcon } from './components/Icons';

interface ImageData {
  base64: string;
  mimeType: string;
}

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<ImageData | null>(null);
  const [outfitImage, setOutfitImage] = useState<ImageData | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonImageUpload = useCallback((base64: string, mimeType: string) => {
    setPersonImage({ base64, mimeType });
  }, []);

  const handleOutfitImageUpload = useCallback((base64: string, mimeType: string) => {
    setOutfitImage({ base64, mimeType });
  }, []);

  const handleTryOn = async () => {
    if (!personImage || !outfitImage) {
      setError('Please upload both your photo and an outfit photo.');
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await generateVirtualTryOn(
        personImage.base64,
        personImage.mimeType,
        outfitImage.base64,
        outfitImage.mimeType
      );
      setResultImage(generatedImage);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  const canTryOn = personImage && outfitImage && !loading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Virtual Try-On AI
            </span>
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Upload your photo and an outfit to see how it looks on you!
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <ImageUploader 
                    id="person-uploader"
                    title="Your Photo"
                    onImageUpload={handlePersonImageUpload}
                />
            </div>
            <div className="lg:col-span-1">
                 <ImageUploader 
                    id="outfit-uploader"
                    title="Outfit Photo"
                    onImageUpload={handleOutfitImageUpload}
                />
            </div>

            <div className="lg:col-span-1 flex flex-col items-center justify-center bg-gray-800/50 rounded-2xl p-6 border border-dashed border-gray-600 min-h-[300px] lg:min-h-0">
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-200">Result</h3>
                <div className="w-full h-full flex items-center justify-center">
                    {loading && (
                        <div className="flex flex-col items-center text-center">
                            <LoadingSpinner className="w-16 h-16 text-purple-400" />
                            <p className="mt-4 text-lg font-semibold animate-pulse">AI is working its magic...</p>
                            <p className="text-sm text-gray-400">This may take a moment.</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                    {resultImage && !loading && (
                        <img 
                            src={`data:image/png;base64,${resultImage}`} 
                            alt="Virtual try-on result" 
                            className="rounded-lg object-contain max-w-full max-h-full"
                        />
                    )}
                    {!loading && !resultImage && !error && (
                         <div className="text-center text-gray-500">
                            <p>Your generated image will appear here.</p>
                         </div>
                    )}
                </div>
            </div>
          </div>

           <div className="mt-8 text-center">
            <button
                onClick={handleTryOn}
                disabled={!canTryOn}
                className={`
                    inline-flex items-center justify-center px-12 py-4 border border-transparent 
                    text-lg font-bold rounded-full shadow-lg text-white 
                    bg-gradient-to-r from-purple-600 to-pink-600 
                    hover:from-purple-700 hover:to-pink-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                    focus:ring-offset-gray-900
                    transition-all duration-300 ease-in-out
                    transform hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-gray-600
                `}
                >
                <MagicWandIcon className="w-6 h-6 mr-3" />
                Try It On!
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
