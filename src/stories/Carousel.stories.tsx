import React from "react";
import { Story, Meta } from "@storybook/react";

import { Carousel, CarouselProps } from "./Carousel";

export default {
  title: "Example/Carousel",
  component: Carousel,
  argTypes: {
    height: { control: "number" },
  },
} as Meta;

const Template: Story<CarouselProps> = (args) => <Carousel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  height: 10,
};
