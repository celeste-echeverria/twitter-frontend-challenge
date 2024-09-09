import { useQueryClient } from '@tanstack/react-query';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';
import { PostData } from '../interfaces/post.interface';
import { S3Service } from '../api/services/S3Service';

interface UseTweetBoxProps extends Omit<UseMutationProps, "endpoint">{}


export const useTweet = ({onError, onSuccess}: UseTweetBoxProps) => {
    const queryClient = useQueryClient();

    return useCustomMutation<any, PostData> ({ 
        endpoint: `post/`,
        onSuccess: async (data, variables) => {
            console.log(`Successfully tweeted`);
            const { upload } = S3Service;
            for (const imageUrl of data.images) {
                const index: number = data.images.indexOf(imageUrl);
                await upload(data.images![index], imageUrl);
            }
            onSuccess?.(data, variables);
        },
        onError
    })
}

