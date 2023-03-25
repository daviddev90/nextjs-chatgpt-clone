import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../../lib/queryApi';
import admin from 'firebase-admin';
import { adminDB } from '../../../firebaseAdmin';

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: 'No prompt provided' });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: 'No chatId provided' });
    return;
  }

  const response = await query(prompt, model);

  const message: Message = {
    text: response || 'ChatGPT is not responding',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k',
    },
  };

  await adminDB
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);

  res.status(200).json({ answer: message.text });
}
