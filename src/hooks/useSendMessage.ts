import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

interface MessageData {
    content: string
}

interface UseSendMessageProps extends Omit<UseMutationProps, "endpoint">{
    recipientId: string
}

export const useSendMessage = ({onError, onSuccess, recipientId}: UseSendMessageProps) => {
    return useCustomMutation<any, MessageData> ({ 
        endpoint: `chat/message/${recipientId}`,
        onSuccess: (data, variables) => {
            console.log(`Successfully saved message: ${recipientId} containing ${variables.content}`);
            onSuccess?.(data, variables);
        },
        onError
    })
}


