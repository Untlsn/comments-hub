import { createMemo, JSX, splitProps } from 'solid-js';

interface AgoCounterProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  days: number
}

const AgoCounter = (_props: AgoCounterProps) => {
  const [props, defaultForWrapper] = splitProps(_props, ['days']);

  const afterCalc = createMemo(() => {
    const days = props.days;
    if (days >= 365) {
      return {
        value: Math.floor(days / 365),
        type: 'year',
      }
    }
    if (days >= 30) {
      return {
        value: Math.floor(days / 30),
        type: 'month',
      }
    }
    if (days >= 7) {
      return {
        value: Math.floor(days / 7),
        type: 'week',
      }
    }
    return {
      value: days,
      type: 'day',
    }
  })

  return (
    <span {...defaultForWrapper}>
      {`${afterCalc().value} ${afterCalc().type}${afterCalc().value > 1 ? 's' : ''} ago`}
    </span>
  );
};

export default AgoCounter;