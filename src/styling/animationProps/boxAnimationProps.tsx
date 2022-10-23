const boxAnimationProps = {
  initial: { x: 16 },
  animate: { x: 0, transition: { duration: 0.2, ease: "easeInOut" } },
  exit: { x: -16, transition: { duration: 0.2 }  },
}

export default boxAnimationProps;