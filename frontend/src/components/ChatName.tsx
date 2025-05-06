import { useNavigate } from "react-router-dom";

interface ChatNameProps {
  index: number;
  chatId: string;
}

const ChatName = ({ index, chatId }: ChatNameProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${chatId}`);
  };

  return (
    <>
      <p
        onClick={handleClick}
        className="mx-2 cursor-pointer transition-all duration-300 hover:mx-3 hover:scale-105 hover:text-primary"
      >
        Chat {index + 1}
      </p>
    </>
  );
};

export default ChatName;
