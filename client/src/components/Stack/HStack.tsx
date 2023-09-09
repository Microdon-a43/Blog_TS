import React, { FC } from 'react';
import Flex, { FlexProps } from './Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

const HStack: FC<HStackProps> = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};

export default HStack;
