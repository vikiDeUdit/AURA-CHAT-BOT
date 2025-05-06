import ChatName from "./ChatName";

interface SavedChatsProps {
  chats: [
    {
      _id: string;
    }
  ];
}

const SavedChats = ({ chats }: SavedChatsProps) => {
  return (
    <>
      <div className="p-2 flex flex-col bg-base-100 rounded-box gap-2">
        <p className="my-2 text-center font-semibold opacity-50">Saved Chats</p>
        {chats.map((chat, index) => (
          <ChatName key={index} index={index} chatId={chat._id} />
        ))}
      </div>
    </>
  );
};

export default SavedChats;
