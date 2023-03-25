'use client';

import { signOut, useSession } from 'next-auth/react';
import NewChat from './NewChat';

function SideBar() {
  // destructue and rename data to session
  const { data: session } = useSession();

  return (
    <div className="flex p-2 flex-col h-screen">
      <div className="flex-1">
        {/*New Chat */}
        <NewChat />

        <div>{/* ModelSelection */}</div>

        {/* Map through the chatRows */}
      </div>

      {session && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="Profile pic"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2
                  hover:opacity-70"
        />
      )}
    </div>
  );
}

export default SideBar;
