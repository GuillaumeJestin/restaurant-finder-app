import { motion } from "framer-motion";
import styled from "styled-components";
import flexVerticalAndCentered from "../css/flexVerticalAndCentered";

const PageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 1;

  ${flexVerticalAndCentered}
`;

export default PageContainer;