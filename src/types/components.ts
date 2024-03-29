
export interface  LayoutProps {
  navigationProps?: {
    isTransparent?: boolean,
    isOpen?: boolean
  },
  showIntro?:boolean,
  introComponent?: any,
  children?: any,
  isSinglePost?:boolean,
  className?: string,
  seo?: {
    title?: string,
    description?: string,
  }
}
export interface NavigationProps {
  isTransparent?: boolean,
  isOpen: boolean,
  toggleMenu: () => void,
  closeMenu: () => void,
}
