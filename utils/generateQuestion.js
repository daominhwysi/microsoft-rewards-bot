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
  
  const apiKey = 'AIzaSyBlz2vStAKzhK8TIWHp2NTPX5ZtO2IKJ9c'
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Tưởng tượng bạn là một User lần đầu tiên nhìn thấy Google bạn hãy tìm kiếm điều bạn thắc mắc. Đảm bảo rằng nó không bị trùng lặp và sáng tạo nhất có thể độ dài 1 câu ngắn.\nVí dụ\ninput :\nHãy đặt câu hỏi\noutput :\nLiệu có phải loài khủng long nào đó từng biết nói tiếng người?",
  });
  
  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function ask() {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
  
    const result = await chatSession.sendMessage("Hãy đặt câu hỏi");
    return result.response.text()
  }

  module.exports = { ask };