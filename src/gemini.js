import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAAztRX_QUf2GymNasPHPQCu4-xW2nQKaU");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function analyzeResume(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}