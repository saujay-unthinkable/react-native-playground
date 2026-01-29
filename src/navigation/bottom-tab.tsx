import React, { FC } from "react";

import { ColorNames } from "@/types/theme";
import Icon from "@/ui/icon";
import Text from "@/ui/text";
import { TabContainer } from "./styles";
import { TabProps } from "./typings";

const COLORS = {
  ACTIVE: "color-primary-500",
  INACTIVE: "color-basic-700",
};

const Tab: FC<TabProps> = ({
  active,
  icon,
  label,
  iconType = "font-awesome-5",
}) => {
  const color = COLORS[active ? "ACTIVE" : "INACTIVE"];

  return (
    <TabContainer>
      <Icon
        name={icon}
        type={iconType}
        color={color}
        size={28}
        width={28}
        height={28}
      />
      <Text
        i18n={label}
        variant="body_xs.regular"
        color={color as ColorNames}
        numberOfLines={1}
      />
    </TabContainer>
  );
};

export default Tab;
