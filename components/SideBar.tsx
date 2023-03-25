import NewChat from './NewChat';

function SideBar() {
  return (
    <div className="flex p-2 flex-col h-screen">
      <div className="flex-1">
        {/*New Chat */}
        <NewChat />

        <div>{/* ModelSelection */}</div>

        {/* Map through the chatRows */}
      </div>
    </div>
  );
}

export default SideBar;
