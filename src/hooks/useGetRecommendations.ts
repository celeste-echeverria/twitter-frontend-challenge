import { useEffect, useState } from "react";
import { Author } from "../interfaces/user.interface";
import useCustomQuery from "../api/hooks/useCustomQuery";

interface UseGetRecommendationsProps {
  page: number;
}

export const useGetRecommendations = ({ page }: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [hasMore, setHasMore] = useState(true); // Nuevo estado para verificar si hay más elementos

  const { data, isLoading, isError, error } = useCustomQuery<Author[]>({
    endpoint: `/user`,
    queryKey: [`recommendedUsers`],
    params: {limit: 10, skip: page}
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (page !== undefined && hasMore) {
        if (data && data.length === 0) {
          setHasMore(false);
        } else if (data) {
          setUsers((prev) => {
            const uniqueIds = new Set(prev.map((user) => user.id));
            const filteredUsers = data.data.filter(
              (user: Author) => !uniqueIds.has(user.id)
            );
            return [...prev, ...filteredUsers];
          });
        }
      }
    };
  
    fetchUsers();
  }, [page, hasMore, data]);
  

  return { users, isLoading, isError, error };
};
