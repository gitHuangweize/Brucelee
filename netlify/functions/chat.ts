import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const handler: Handler = async (event, context) => {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 从环境变量获取 Key (在 Netlify 后台配置)
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY environment variable');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // 解析请求体
    const body = JSON.parse(event.body || '{}');
    const { message, systemInstruction } = body;

    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Message is required' }) };
    }

    // 初始化 Gemini
    const ai = new GoogleGenAI({ apiKey });
    
    // 调用模型
    // 注意：根据 @google/genai 的具体版本，API 可能略有不同
    // 这里使用与之前前端代码一致的调用方式
    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: { systemInstruction }
    });

    const text = result.text || "";

    return {
      statusCode: 200,
      body: JSON.stringify({ response: text }),
    };

  } catch (error: any) {
    console.error('Error generating content:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate content', details: error.message }),
    };
  }
};

export { handler };
