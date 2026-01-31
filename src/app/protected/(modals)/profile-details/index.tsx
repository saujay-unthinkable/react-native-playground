import { GET_ME } from "@/constants/api-endpoints";
import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import { useGet } from "@/hooks/use-https";
import Button from "@/ui/button";

const ProfileDetails = () => {
  const { data: getProfileResponse, error: getProfileError } = useGet(GET_ME);

  console.log("[Profile Data]:", getProfileError, getProfileResponse);
  return (
    <StyledSafeAreaView>
      <StyledPageWrapper spacingTop="xxxxxl">
        <Button>Details</Button>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
};

export default ProfileDetails;
