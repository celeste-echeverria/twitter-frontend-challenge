import { useEffect, useState } from "react";
import { getRecommendedUsers } from "../api/services/userService";
import { Author } from "../api/types";

interface UseGetRecommendationsProps {
  page: number;
}

export const useGetRecommendations = ({ page }: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Nuevo estado para verificar si hay más elementos

  const getUsers = async () => {
    return await getRecommendedUsers(10, page);
  };

  useEffect(() => {
    if (page !== undefined && hasMore) {
      setLoading(true);
      getUsers()
        .then((response) => {
          if (response.length === 0) {
            setHasMore(false);
          } else {
            setUsers((prev) => {
              const uniqueIds = new Set(prev.map((user) => user.id));
              const filteredUsers = response.filter(
                (user: Author) => !uniqueIds.has(user.id)
              );
              return [...prev, ...filteredUsers];
            });
          }
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }
  }, [page, hasMore]);

  return { users, loading, error };
};
