import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export function NonStyleLink(props) {
  return <Link style={{textDecoration: 'none'}} {...props}/>;
}

export function NonStyleNavLink(props) {
  return <NavLink style={{textDecoration: 'none'}} {...props}/>;
}

export const RealNonStyleLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;