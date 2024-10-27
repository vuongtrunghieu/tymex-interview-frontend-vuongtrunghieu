'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '../utils';

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: 'top' | 'bottom';
  label?: (value: number | undefined) => React.ReactNode;
  rangeClassName?: string;
  thumbClassName?: string;
  showMinMax?: boolean;
  unit?: string;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    {
      className,
      label,
      labelPosition = 'top',
      rangeClassName,
      thumbClassName,
      showMinMax = false,
      unit,
      ...props
    },
    ref,
  ) => {
    const initialValue = Array.isArray(props.value)
      ? props.value
      : [props.min, props.max];

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range
            className={cn('absolute h-full bg-muted', rangeClassName)}
          />
        </SliderPrimitive.Track>
        {initialValue.map((value, index) => (
          <React.Fragment key={`${index + 1}`}>
            <SliderPrimitive.Thumb
              className={cn(
                'relative block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                thumbClassName,
              )}
            >
              {label && (
                <span
                  className={cn(
                    'absolute flex w-full justify-center',
                    labelPosition === 'top' && '-top-7',
                    labelPosition === 'bottom' && 'top-4',
                  )}
                >
                  {label(value)}
                </span>
              )}
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
        {showMinMax && (
          <>
            <span className="text-xs absolute -bottom-8 left-0">
              {props.min} {unit || ''}
            </span>
            <span className="text-xs absolute -bottom-8 right-0">
              {props.max} {unit || ''}
            </span>
          </>
        )}
      </SliderPrimitive.Root>
    );
  },
);
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
