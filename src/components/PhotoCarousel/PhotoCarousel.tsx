import { useEffect, useRef, useState } from "react";
import useEvent from "react-use-event-hook";
import styled from "styled-components";
import getPhotoUrl from "../../services/getPhotoUrl";
import FSQ_Photo from "../../types/FSQ_Photo";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import PressableText from "../PressableText/PressableText";
import { useFocus } from "react-aria";

type PhotoCarouselProps = {
  photos: FSQ_Photo[];
}

const PhotoCarousel = ({ photos }: PhotoCarouselProps) => {

  const [index, setIndex] = useState(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Function trigger on each scroll event of the carousel, calculating the current index of the most left image displayed photo
  // Using useEvent to always have an up to date value of the index state while having a stable function identity (https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)
  const onScroll = useEvent(() => {
    if (sliderContainerRef.current) {
      const element = sliderContainerRef.current;

      const mostLeftVisiblePhotoIndex = getMostLeftVisiblePhotoElement(element)?.index;

      // If we found an index and if it's different to the index state, then we update it
      if (mostLeftVisiblePhotoIndex !== undefined && mostLeftVisiblePhotoIndex !== index) {
        setIndex(mostLeftVisiblePhotoIndex);
      }
    }
  });

  useEffect(() => {
    if (sliderContainerRef.current) {
      onScroll();

      const element = sliderContainerRef.current;

      element.addEventListener("scroll", onScroll);

      return () => {
        element.removeEventListener("scroll", onScroll);
      }
    }
  }, [photos, onScroll]);

  // Function trigger when pressing on the chevrons, will scroll to either the next or previous photo
  const onChevronClick = useEvent((offset: number) => {
    if (sliderContainerRef.current) {
      const element = sliderContainerRef.current;

      // Taking the next or previous photo element to then scroll to it
      const photoElements = Array.from(element.childNodes).filter(element => element instanceof HTMLElement) as HTMLElement[];

      const elementToScroll = photoElements[index + offset];

      // If elementToScroll exist, then we scroll to it
      if (elementToScroll) {
        elementToScroll.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

        const photoBoundingRect = elementToScroll.getBoundingClientRect();
        const elementBoundingRect = element.getBoundingClientRect();

        const newScroll = photoBoundingRect.x - elementBoundingRect.x + element.scrollLeft + (offset > 0 ? 1 : 0);
        //                                                                                   👆 
        //                       This is a little trick to avoid some problem with the index computing on scroll when scroll toward the next photo

        element.scrollTo({ left: newScroll, behavior: "smooth" });
      }
    }
  });

  const { focusProps } = useFocus({});

  return (
    <PhotoCarouselContainer>
      <SliderContainer {...focusProps} tabIndex={0} ref={sliderContainerRef}>
        {
          photos.map((photo, index) => {

            return (
              <img
                key={photo.id}
                src={getPhotoUrl(photo)}
                height="100%"
                alt={`Restaurant ${index + 1}`}
              />
            )
          })
        }
      </SliderContainer>
      <CounterContainer>
        {index + 1} / {photos.length}
      </CounterContainer>
      <ChevronContainer style={{ left: "1rem" }}>
        <PressableText onPress={() => onChevronClick(-1)}>
          <HiChevronLeft style={{ marginLeft: "-0.25rem", marginTop: "0.25rem" }} size="3rem" />
        </PressableText>
      </ChevronContainer>
      <ChevronContainer style={{ right: "1rem" }}>
        <PressableText onPress={() => onChevronClick(1)}>
          <HiChevronRight style={{ marginLeft: "0.25rem", marginTop: "0.25rem" }} size="3rem" />
        </PressableText>
      </ChevronContainer>
    </PhotoCarouselContainer>
  )
}

export default PhotoCarousel;

/**
 * This function will return the most left visible image html element
 * @param element Div container of the photo list
 * @returns JS object containing three attributes, the element of the most left visible image, its index and the array of photo elements, can be undefined
 */
const getMostLeftVisiblePhotoElement = (element: HTMLDivElement) => {
  const elementBoundingRect = element.getBoundingClientRect();

  // Getting all photo elements to find the most left that is visible
  const photoElements = Array.from(element.childNodes).filter(element => element instanceof HTMLElement) as HTMLElement[];

  const mostLeftVisiblePhoto = photoElements.find(photoElement => {
    const photoBoundingRect = photoElement.getBoundingClientRect();

    const photoOffset = photoBoundingRect.x - elementBoundingRect.x;
    const photoOffsetEnd = photoBoundingRect.x - elementBoundingRect.x + photoBoundingRect.width;

    // If the left offset of the photo if below or equal to 0 and the right offset is superior to 0
    // We can then consider it as the most left visible photo
    return photoOffset <= 0 && photoOffsetEnd > 0;
  });

  if (!mostLeftVisiblePhoto) return undefined;

  return {
    element: mostLeftVisiblePhoto,
    index: photoElements.indexOf(mostLeftVisiblePhoto),
    list: photoElements
  }
}

const PhotoCarouselContainer = styled.div`
  display: flex;
  overflow: auto;
  position: relative;

  height: 18vh;

  @media (min-height: 600px) {
    height: 16em;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  overflow: auto;
  height: 100%;
  flex: 1;
`;

const CounterContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  background: ${props => props.theme.background};
  padding: 0.25em 0.75rem;
  border-radius: 0.75rem;
  box-shadow: ${props => props.theme.boxShadow};
  font-size: 0.75rem;
`

const ChevronContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  background: ${props => props.theme.background};
  border-radius: 2rem;
  width: 3rem;
  height: 3rem;
  box-shadow: ${props => props.theme.boxShadow};
  display: flex;
  justify-content: center;
  align-items: center;
`