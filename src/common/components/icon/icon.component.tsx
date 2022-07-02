
import s from "./icon.module.scss"
import { IconProps } from "./icon.type";
import classnames from "classnames";
import Search from "../icon/svg/search.svg"
import Heart from "../icon/svg/heart.svg"
import User from "../icon/svg/user.svg"
import Basket from "../icon/svg/basket.svg"
import Chevrondown from "./svg/chevrondown.svg";
import Chevronleft from "./svg/chevronleft.svg";
import Chevronright from "./svg/chevronright.svg";
import Chevronup from "./svg/chevronup.svg";

const allIcons: Record<string, React.ReactElement> = {
    Basket,
    Heart,
    User,
    Search,
    Chevrondown,
    Chevronleft,
    Chevronright,
    Chevronup,
};
const toCapitalize = (stringToCapitalize: string): string => {
    let capitalizedString = "";
    stringToCapitalize.split(" ").forEach((value) => {
      capitalizedString += `${value.toLowerCase().charAt(0).toUpperCase()}${value.toLowerCase().slice(1)} `;
    });
    return capitalizedString.trim();
  };

  
const Icon: React.FC<IconProps> = ({ classes, iconType, ...props }) => {
    if (iconType) {
        const IconSvgr = allIcons[toCapitalize(iconType)] as unknown as () => React.ReactElement<IconProps>;
        const additionalClasses = s[iconType];
        return <IconSvgr className={classnames(s.icon, additionalClasses, classes)} {...props} />;
      }
      return null;
};
export default Icon;