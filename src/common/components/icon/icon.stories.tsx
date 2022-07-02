import { Meta, Story } from "@storybook/react";

import Icon from "./icon.component";
import { IconProps, IconType } from "./icon.type";

export default {
    title: "Common/Icon",
    component: Icon,
    argTypes: {
      iconType: {
        options: IconType,
        control: { type: "select" },
      },
    },
  } as Meta;

  const Template: Story<IconProps> = (args: IconProps) => <Icon {...args} />;

  export const JustTheIcon = Template.bind({});

JustTheIcon.args = {
  iconType: IconType.SEARCH,
};