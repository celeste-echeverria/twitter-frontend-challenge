import useCustomQuery from "../api/hooks/useCustomQuery";
import { Post } from "../interfaces/post.interface";

interface UseGetPostProps {
    postId: string;
}
export const useGetPost = ({postId}: UseGetPostProps) => {
  return useCustomQuery<Post[]>({
    endpoint: `/post/${postId}`,
    queryKey: ['Post', postId],
  });
};
