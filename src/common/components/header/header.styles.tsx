import { Box, Button, Popover } from '@mui/material';
import styled from 'styled-components';

export const TopHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 2000px;
  max-height: 50px;
  margin: 0 auto;
  padding: 0 20px;
`;
export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 2000px;
  height: 50px;
  margin: 0 auto;
  padding: 20px 0;
`;

export const NavLogo = styled.div`
  flex-grow: 0;
  width: 16%;
`;

export const ShortcutNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 16%;
  column-gap: 8px;
  margin-right: 10px;
`;

export const StyledButton = styled(Button)`
  text-transform: none !important;
`;

export const NavBar = styled(Box)`
  flex-grow: 1;
  text-transform: none;
`;

export const Menu = styled(Popover)`
  border-radius: 5px;
`;
