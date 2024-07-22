/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// API key should be securely managed, not hardcoded
const ak = 'AIzaSyBlz2vStAKzhK8TIWHp2NTPX5ZtO2IKJ9c';  // Replace with your actual API key
const genAI = new GoogleGenerativeAI(ak);

const generationConfig = {
  temperature: 2.0,  // Adjusted temperature for more balanced creativity
  topP: 0.9,         // Adjusted topP for better output quality
  topK: 50,          // Adjusted topK for better output quality
  maxOutputTokens: 1024,  // Reduced token limit to avoid excessive output
  responseMimeType: "text/plain",
};

async function ask() {
  let model;

  if (Math.random() < 0.5) {
      model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `Imagine you are a first-time user of Google; search for something you are curious about. Ensure it is unique and highly creative, and keep it to one short sentence. Example input: Ask a question output: Did any dinosaurs ever speak human language?`,
      });
  } else {
      model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `Hãy tưởng tượng bạn là một người dùng lần đầu tiên sử dụng Google; tìm kiếm điều gì đó mà bạn tò mò. Đảm bảo rằng nó là duy nhất và sáng tạo nhất có thể, và giữ nó trong một câu ngắn. Ví dụ input: Hãy đặt câu hỏi output: Liệu có loài khủng long nào từng biết nói tiếng người không?`,
      });
  }

  const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
  });

  const result = await chatSession.sendMessage("Hãy đặt câu hỏi");
  return result.response.text();
}

module.exports = { ask };
