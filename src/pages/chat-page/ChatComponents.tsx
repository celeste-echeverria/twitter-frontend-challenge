import React from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
    max-height: 100vh;
    max-width: 600px;
    border-right: 1px solid #ebeef0;
    display: flex;
    flex-direction: column;
`;

const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ebeef0;
    background-color: #fff;
`;

const UserDetails = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
`;

const UserUsername = styled.h1`
    font-size: 14px;
    font-weight: 400;
    margin-left: 8px;
`;
const ChatBody = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background-color: #fff;
`;

const MessageInputContainer = styled.div`
    padding: 16px;
    border-top: 1px solid #ebeef0;
    display: flex;
    align-items: center;
`;

const MessageInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 8px;
    outline: none;
`;

const SendMessageButton = styled.button`
    padding: 10px 20px;
    background-color: #1da1f2;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`;

export { ChatContainer, ChatHeader, UserDetails, UserName, ChatBody, MessageInputContainer, MessageInput, SendMessageButton, UserUsername }