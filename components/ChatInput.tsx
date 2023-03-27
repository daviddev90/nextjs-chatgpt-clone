'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();

  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt('');

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );

    // 나중에 덮어쓰기 위해 변수로 저장
    const notification = toast.loading('ChatGPT가 답변을 준비중입니다...');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success('답변이 도착했습니다!', {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={(e) => sendMessage(e)} className="p-5 space-x-5 flex">
        <input
          className="flex-1 bg-transparent focus:outline-none
          disabled:cursor-not-allowed disabled:text-gray-300 "
          disabled={!session}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your message..."
        />
        <button
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold
          px-4 py-2 rounded 
          disabled:cursor-not-allowed disabled:text-gray-300"
          type="submit"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
