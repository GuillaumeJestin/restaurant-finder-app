import { ReactNode, RefObject, useRef } from "react";
import { SliderState, useSliderState } from 'react-stately';
import {
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden
} from 'react-aria';
import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useTheme from "../../hooks/useTheme";
import Label from "../../styling/styledComponents/Label";

// Check out this page to understand how this slider is made
// Using heavily react-aria library to have a nice accessible component
// https://react-spectrum.adobe.com/react-aria/useSlider.html

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
  label?: ReactNode;
  minValue?: number;
  maxValue?: number;
  readOnly?: boolean;
}

const Slider = ({ value, onChange, label, minValue, maxValue, readOnly }: SliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const numberFormatter = useNumberFormatter({ style: "unit", unit: "meter" });

  const _onChange = (value: number | number[]) => {
    if (!Array.isArray(value)) {
      onChange?.(value);
    }
  }

  const state = useSliderState({ numberFormatter, value, minValue, maxValue, onChange: _onChange, isDisabled: readOnly });

  const {
    groupProps,
    trackProps,
    labelProps,
    outputProps
  } = useSlider({ value, label, minValue, maxValue, onChange: _onChange, isDisabled: readOnly }, state, trackRef);

  return (
    <div {...groupProps} >
      {label &&
        <div>
          <Label {...labelProps}>{label}</Label>
        </div>
      }
      <TrackContainer
        {...trackProps}
        ref={trackRef}
      >
        <TrackProgress style={{ width: `${state.getThumbPercent(0) * 100}%` }} />
        <Thumb state={state} trackRef={trackRef} />
      </TrackContainer>
      <OutputContainer {...outputProps}>
        {state.getThumbValueLabel(0)}
      </OutputContainer>
    </div>
  );
}

export default Slider;

type ThumbProps = {
  trackRef: RefObject<HTMLDivElement>;
  state: SliderState;
}

const Thumb = ({ trackRef, state }: ThumbProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { thumbProps, inputProps } = useSliderThumb({
    index: 0,
    trackRef,
    inputRef
  }, state);
  const { focusProps } = useFocusRing();

  const theme = useTheme();

  return (
    <ThumbContainer data-testid="thumb" {...thumbProps}>
      <HiChevronLeft size={"2rem"} color={theme.textColorLight} />
      <HiChevronRight size={"2rem"} style={{ marginLeft: "-0.75rem" }} color={theme.textColorLight} />
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </ThumbContainer>
  )
}

const ThumbContainer = styled.div`
  background-color: ${props => props.theme.primary};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.25rem;
  box-shadow: ${props => props.theme.boxShadowSmall};

  :focus-within {
    outline: 0.2rem solid ${props => props.theme.primary};
    outline-offset: 0.15rem;
  }
`;

const TrackContainer = styled.div`
  height: 0.5rem;
  background: ${props => props.theme.muted};
  margin: 1rem 0;
  border-radius: 0.25rem;
`;

const TrackProgress = styled.div`
  background: ${props => props.theme.primary};
  top: 0;
  left: 0;
  height: 100%;
  position: absolute;
  border-radius: 0.25rem;
  opacity: 0.5;
`;

const OutputContainer = styled.output`
  display: block;
  text-align: center;
`