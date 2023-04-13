import { openai, regionFunctions } from '../../helper';

/**
 * chatGPT
 * chatgpt.v1.sample.getMessage({message: "日本人が好きな食べ物は？"})
 * リクエスト
 * {
 *     "model": "gpt-3.5-turbo",
 *     "messages": [{"role": "user", "content": "Hello!"}]
 *  }
 * レスポンス
 * {
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "\n\nHello there, how may I assist you today?",
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
  }
 */
export const getMessage = regionFunctions.https.onCall(
  async (data, context) => {
    const content = `
      以下のメッセージを箇条書きで5つ表示して
      ${data.message}
      フォーマットは以下
      [{1:"xxxxx"},{2:"xxxxx"},{3:"xxxxx"},{4:"xxxxx"},{5:"xxxxx"}]
    `;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: content }],
    });

    const message = completion.data.choices[0].message?.content;
    console.log(message);

    return message;
  }
);
