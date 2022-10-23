import { motion } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
  background: ${props => props.theme.background};
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 1rem;
  padding: 2rem;
`;

export default Box;