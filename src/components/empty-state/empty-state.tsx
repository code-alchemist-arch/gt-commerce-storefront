import React from "react";
import Image from "next/image";
import {
  EmptyStateMessage,
  EmptyStateTitle,
  EmptyStateWrapper,
} from "./empty-state.style";

const EmptyState = ({ title, message, imgSrc }) => {
  return (
    <EmptyStateWrapper>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateMessage>{message}</EmptyStateMessage>
      {imgSrc && (
        <Image src={imgSrc} width={175} height={175} quality={100} priority />
      )}
    </EmptyStateWrapper>
  );
};

export default EmptyState;
