import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NoStyleLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
