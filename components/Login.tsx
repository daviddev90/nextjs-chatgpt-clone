'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
  return (
    <div
      className="bg-[#11A37F] h-screen flex flex-col items-center
    justify-center text-center"
    >
      <Image
        // next.config.js에서 images domain을 추가해야함
        src="https://links.papareact.com/2i6"
        width={200}
        height={200}
        alt="logo"
      />
      <button
        //https://console.cloud.google.com/apis/credentials
        // > OAuth 2.0 클라이언트 ID
        // > Authorized JavaScript origins, Authorized redirect URIs 설정
        onClick={() => signIn('google')}
        className="text-white font-bold text-3xl animate-pulse"
      >
        로그인해주세요
      </button>
    </div>
  );
}

export default Login;
