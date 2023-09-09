import React, { FC } from 'react';
import Flex, { FlexProps } from './Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

const VStack: FC<VStackProps> = (props: VStackProps) => {
  return <Flex direction="column" align="start" {...props} />;
};

export default VStack;
