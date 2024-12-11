import { NavItem } from "../nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Item Management',
    iconName: 'layout-dashboard',
    route: '/items',
  },
  {
    displayName: 'Invoice Management',
    iconName: 'list',
    route: '/invoices',
  },
];
