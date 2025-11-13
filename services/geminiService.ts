
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `
Restore this old photograph. 
Enhance its quality, fix any damages like scratches, dust, or tears, and colorize it realistically. 
The goal is to make it look like a modern, high-quality photograph while preserving the original subjects and composition. 
Do not add any elements that were not in the original photo.
`;

export const restorePhoto = async (imageBase64: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: PROMPT,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to restore photo due to an API error.");
  }
};
