import styled from "styled-components";
import { HiStar } from "react-icons/hi";
import useTheme from "../../hooks/useTheme";

type RatingDisplayProps = {
  rating?: number;
};

const STAR_SIZE = "1.25rem";

const RatingDisplay = ({ rating }: RatingDisplayProps) => {

  const theme = useTheme();

  if (rating === undefined) {
    return <NoRatingContainer>No Rating</NoRatingContainer>
  }

  // Note: rating goes from 0 to 10, for a better UX, we will display it between 0 and 5

  // ClipPath for the display of stars
  const clipPathMutedStars = `inset(0 0 0 ${rating * 10}%)`;
  const clipPathFilledStars = `inset(0 ${(10 - rating) * 10}% 0 0)`;

  return (
    <RatingContainer>
      <div style={{marginRight: "0.25rem"}}>
        {rating / 2}
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ clipPath: clipPathMutedStars }}>
          <HiStar size={STAR_SIZE} color={theme.muted} />
          <HiStar size={STAR_SIZE} color={theme.muted} />
          <HiStar size={STAR_SIZE} color={theme.muted} />
          <HiStar size={STAR_SIZE} color={theme.muted} />
          <HiStar size={STAR_SIZE} color={theme.muted} />
        </div>
        <div style={{ position: "absolute", top: 0, clipPath: clipPathFilledStars }}>
          <HiStar size={STAR_SIZE} color={theme.starColor} />
          <HiStar size={STAR_SIZE} color={theme.starColor} />
          <HiStar size={STAR_SIZE} color={theme.starColor} />
          <HiStar size={STAR_SIZE} color={theme.starColor} />
          <HiStar size={STAR_SIZE} color={theme.starColor} />
        </div>
      </div>
    </RatingContainer>
  )
}

export default RatingDisplay;

const NoRatingContainer = styled.span`
  font-style: italic;
`;

const RatingContainer = styled.span`
  display: inline-flex;
`;