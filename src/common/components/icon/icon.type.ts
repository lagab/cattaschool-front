export type IconProps = React.SVGProps<SVGSVGElement> & {
    classes?: string;
    iconType: IconType;
  };
  
  export enum IconType {
    USER = "user",
    SEARCH = "search",
    HEART = "heart",
    BASKET = "basket",
    CHEVRON_DOWN = "chevrondown",
    CHEVRON_LEFT = "chevronleft",
    CHEVRON_RIGHT = "chevronright",
    CHEVRON_UP = "chevronup",
  }