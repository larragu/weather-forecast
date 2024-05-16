"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import NextLink from "next/link";
import { ListItem, Link as MuiLink } from "@mui/material";

const menuItems = [
  { path: "/", label: "Home", activeSegmentId: null },
  { path: "/favorites", label: "Favorites", activeSegmentId: "favorites" },
];

const MenuItems = (): JSX.Element => {
  const activeSegment = useSelectedLayoutSegment();
  return (
    <>
      {menuItems.map(({ path, label, activeSegmentId }) => {
        const isActive = activeSegment === activeSegmentId;
        return (
          <ListItem key={path}>
            <MuiLink
              underline="hover"
              color={isActive ? "secondary" : undefined}
              component={NextLink}
              href={path}
            >
              {label}
            </MuiLink>
          </ListItem>
        );
      })}
    </>
  );
};

export default MenuItems;
