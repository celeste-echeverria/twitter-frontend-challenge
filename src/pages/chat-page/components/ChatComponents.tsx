import React from "react";
import styled from "styled-components";

export const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ebeef0;
    background-color: #fff;
`;

export const UserDetails = styled.div`
    display: flex;
    align-items: center;
`;

export const UserName = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
`;

export const UserUsername = styled.h1`
    font-size: 14px;
    font-weight: 400;
    margin-left: 8px;
`;
export const ChatBody = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background-color: #fff;
`;

export const MessageInputContainer = styled.div`
    padding: 16px;
    border-top: 1px solid #ebeef0;
    display: flex;
    align-items: center;
`;

export const SendMessageButton = styled.button`
    padding: 10px 20px;
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
`;

export const MessageContainer = styled.div<{ isOwnMessage: boolean }>`
  padding: 10px;
  margin: 5px;
  background-color: ${({ isOwnMessage }) => (isOwnMessage ? '#d1ffd6' : '#f1f1f1')};
  border-radius: 10px;
  max-width: 70%;
  align-self: ${({ isOwnMessage }) => (isOwnMessage ? 'flex-end' : 'flex-start')};
  display: flex;
  flex-direction: column;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;



