import React from "react";
import { StyledBar } from "./message-bar.style";
import Link from "next/link";
type MessageBar = {
  link?: string;
  message: string;
  className?: string;
  top?: boolean;
};

const MessageBar: React.FC<MessageBar> = (props: MessageBar) => {
  const { link, message, className, top } = props;
  return (
    <Link href={link || "/"} passHref>
      <StyledBar className={`${className} ${link ? "link" : ""}`} top={top}>
        <div>{message}</div>
      </StyledBar>
    </Link>
  );
};

export default MessageBar;
