import { MenuItem } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '../icon/icon.component';
import { IconType } from '../icon/icon.type';
import {
  Menu,
  NavBar,
  NavLogo,
  ShortcutNav,
  StyledButton,
  StyledHeader,
  TopHeader,
} from './header.styles';

const pages = ['Products', 'Pricing', 'Blog'];

const Header: React.FC = ({}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <TopHeader></TopHeader>
      <StyledHeader>
        <NavLogo>
          <Link href="/">
            <Image src="/logo.png" width="95" height="29" />
          </Link>
        </NavLogo>
        <NavBar sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <StyledButton key={page} onClick={() => console.log('clicked')}>
              {page}
            </StyledButton>
          ))}
          <StyledButton
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Dashboard
          </StyledButton>
          <Menu
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </NavBar>

        <ShortcutNav>
          <StyledButton
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            disableRipple
          >
            <Icon iconType={IconType.USER} />
            connexion
          </StyledButton>
          <Link href="/google">
            <a title="search">
              <Icon iconType={IconType.SEARCH} classes="regular" />
            </a>
          </Link>
          <Link href="/account">
            <a title="Mon compte">
              <Icon iconType={IconType.USER} />
            </a>
          </Link>
          <Link href="/">
            <Icon iconType={IconType.HEART} />
          </Link>
          <Link href="/">
            <Icon iconType={IconType.BASKET} />
          </Link>
        </ShortcutNav>
      </StyledHeader>
      <div>header</div>
    </>
  );
};

export default Header;
