import { useTranslation } from "react-i18next";
import FollowUserBox from "../../../../components/follow-user/FollowUserBox";
import { useGetRecommendations } from "../../../../hooks/useGetRecommendations";
import { StyledSuggestionBoxContainer } from "./SuggestionBoxContainer";
import Loader from "../../../../components/loader/Loader";

const SuggestionBox = () => {
  const { t } = useTranslation();

  const { users = [], isLoading, isError, error } = useGetRecommendations({ page: 0 });

  return (
    <StyledSuggestionBoxContainer>
      <h6>{t("suggestion.who-to-follow")}</h6>

      {/* Mostrar mensaje de carga */}
      {isLoading && <Loader/>}

      {/* Manejar el error */}
      {isError && <p>{t("suggestion.error-loading-recommendations")}</p>}

      {/* Mostrar los usuarios si hay */}
      {users.length > 0 ? (
        users
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          })
          .slice(0, 5)
          .map((user) => (
            <FollowUserBox
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              profilePicture={user.profilePicture}
            />
          ))
      ) : (
        !isLoading && <p>{t("suggestion.no-recommendations")}</p> // No mostrar el mensaje si está cargando
      )}

      {users.length > 5 && (
        <a href="/recommendations">{t("suggestion.show-more")}</a>
      )}
    </StyledSuggestionBoxContainer>
  );
};

export default SuggestionBox;