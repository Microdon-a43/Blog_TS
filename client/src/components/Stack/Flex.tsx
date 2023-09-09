import React, { FC, ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import cls from './Flex.module.scss';

type DirectionTypes = 'row' | 'column';
type AlignTypes = 'center' | 'end' | 'start';
type JustifyTypes = 'center' | 'end' | 'start' | 'between' | 'around';
type gapTypes = 5 | 8 | 12 | 15 | 20 | 24 | 28 | 32;

export interface FlexProps {
  gap?: gapTypes;
  align?: AlignTypes;
  justify?: JustifyTypes;
  direction?: DirectionTypes;
  max?: boolean;
  className?: string;
  children: ReactNode;
}

const Flex: FC<FlexProps> = ({
  gap = 5,
  align = 'center',
  justify = 'start',
  direction = 'row',
  max = false,
  className,
  children,
}) => {
  const gapClasses: Record<gapTypes, string> = {
    5: cls.gap5,
    8: cls.gap8,
    12: cls.gap12,
    15: cls.gap15,
    20: cls.gap20,
    24: cls.gap24,
    28: cls.gap28,
    32: cls.gap32,
  };
  const alignClasses: Record<AlignTypes, string> = {
    center: cls.center,
    start: cls.start,
    end: cls.end,
  };

  const justifyClasses: Record<JustifyTypes, string> = {
    center: cls.justifyCenter,
    start: cls.justifyStart,
    end: cls.justifyEnd,
    between: cls.between,
    around: cls.around,
  };

  const directionClasses: Record<DirectionTypes, string> = {
    row: cls.row,
    column: cls.column,
  };
  return (
    <div
      className={classNames(
        cls.flex,
        {
          [cls.max]: max,
        },
        [
          gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          directionClasses[direction],
          className,
        ]
      )}
    >
      {children}
    </div>
  );
};

export default Flex;
