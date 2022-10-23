import styled from "styled-components";
import FSQ_Tip from "../../types/FSQ_Tip";
import { FormattedDate } from "react-intl";

type ReviewDisplayProps = {
  review: FSQ_Tip;
}

const ReviewDisplay = ({ review }: ReviewDisplayProps) => {

  return (
    <ReviewDisplayContainer>
      <DateContainer>
        <FormattedDate value={new Date(review.created_at)} />
      </DateContainer>
      <div>
        {review.text}
      </div>
    </ReviewDisplayContainer>
  )
};

export default ReviewDisplay;

const DateContainer = styled.div`
  font-size: 0.75rem;
`;

const ReviewDisplayContainer = styled.div`
  margin-bottom: 2rem;

  :last-child {
    margin-bottom: 0;
  }
`;