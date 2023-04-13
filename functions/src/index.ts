import * as admin from 'firebase-admin';
import * as chatgpt from './chatgpt';

// initialize
admin.initializeApp();
export const db = admin.firestore();

export { chatgpt };
