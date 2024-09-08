import { useEffect, useState } from "react";
import { Author } from "../interfaces/user.interface";
import { searchUsers } from "../api/services/userService";
import { LIMIT } from "../util/Constants";
import useCustomQuery from "../api/hooks/useCustomQuery";

interface UseGetRecommendationsProps {
  query: string;
  skip: number;
}

export const useGetSearchUsers = ({
  query,
  skip,
}: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data, isLoading, isError, error } = useCustomQuery<Author[]>({
    endpoint: `/users/search`,
    queryKey: [`searchUsers`, query, skip],
    params:{ limit: LIMIT, skip },
  });

  useEffect(() => {
    setUsers([]);
  }, [query]);

  useEffect(() => {
    if (data) {
      const updatedUsers = [...users, ...data.data];
      const uniqueUsers = updatedUsers.filter((user, index) => {
        const currentIndex = updatedUsers.findIndex((u) => u.id === user.id);
        return currentIndex === index;
      }).filter((user) => user.username.includes(query));

      setUsers(uniqueUsers);
      setHasMore(data.data.length > 0);
      //todo: check data
    }
  }, [data]);

  return { users, isLoading, isError, error, hasMore };

};
