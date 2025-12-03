import { GoogleGenAI } from "@google/genai";
import { MODEL_NAME } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not set in environment variables.");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateStyledImage = async (
  prompt: string,
  styleInstruction: string,
  baseImage: File | null
): Promise<string> => {
  const ai = getAiClient();
  
  // Construct the prompt
  const fullPrompt = `
    Task: ${baseImage ? "Edit the provided image" : "Generate an image"} based on the User Prompt and the Style Guide below.
    
    User Prompt: ${prompt}
    
    ${styleInstruction}
    
    Requirements:
    - Strictly adhere to the visual language, color palette, and mood described in the Style Guide.
    - High quality, professional design output.
    - If editing: Maintain the subject matter but completely transform the style.
  `;

  try {
    const parts: any[] = [];

    // Add image if exists
    if (baseImage) {
      const imagePart = await fileToGenerativePart(baseImage);
      parts.push(imagePart);
    }

    // Add text prompt
    parts.push({ text: fullPrompt });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: parts
      },
      config: {
        // We do not set responseMimeType for image generation models usually unless asking for JSON metadata, 
        // but here we want an image. For gemini-2.5-flash-image, it returns inlineData or we use the generated image structure.
        // However, based on the docs provided: "The output response may contain both image and text parts".
      }
    });

    // Parse response
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const content = candidates[0].content;
    const responseParts = content.parts;

    for (const part of responseParts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data found in response. The model might have refused the request or returned only text.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
