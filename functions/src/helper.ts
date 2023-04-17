import * as functions from 'firebase-functions';
import { Configuration, OpenAIApi } from 'openai';

// funtionsのリージョン指定
export const regionFunctions = functions.region('asia-northeast1');

// openaiのインスタンス作成
const configuration = new Configuration({
  apiKey: functions.config().openai.app_key,
});

export const openai = new OpenAIApi(configuration);

// constans
export const main_app_name = 'chatgpt';
