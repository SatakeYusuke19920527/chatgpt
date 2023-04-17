import * as functions from 'firebase-functions';
import { openai, regionFunctions } from '../../helper';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '1GB',
};

/**
 * chatGPT
 * chatgpt.v1.Gpt35.getMessage({message: "日本人が好きな食べ物は？"})
 */
export const getMessage = regionFunctions
  .runWith(runtimeOpts)
  .https.onCall(async (data, context) => {
    const content = `
      ${data.message}
      # 上記を以下のようなJavaSctiptの配列の形で返して
      > ["data1","data2","data3"]
      # 他の文字は不要です。
    `;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: content }],
    });
    return JSON.stringify(completion.data.choices[0].message?.content);
  });
