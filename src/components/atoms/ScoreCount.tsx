import Plus from '$/components/svg/Plus';
import Minus from '$/components/svg/Minus';
import { createEffect, createSignal } from 'solid-js';

interface ScoreCountProps {
  score: number
  onChange?(score: number): void
}

const buttonStyle = 'h-10 w-12 flex items-center justify-center text-[#C5C6EF] hover:text-background-blue-dark'

const ScoreCount = (props: ScoreCountProps) => {
  const [score, setScore] = createSignal(props.score);
  const [changeData, setChangeData] = createSignal({
    bef: 0,
    cur: 0,
  });

  createEffect(() => {
    // If one button is clicked 2 times
    if (changeData().bef && changeData().bef == changeData().cur) {
      if (changeData().cur == 1) {
        setScore(props.score);
      }
      else if (changeData().cur == -1) {
        setScore(props.score)
      }
    } else {
      props.onChange?.(score());
    }
  })

  return (
    <div class='text-center font-bold bg-background-blue-light rounded-xl text-lg'>
      <button
        class={buttonStyle}
        classList={{ 'text-background-blue-dark': score() > props.score }}
        onClick={() => {
          setScore(props.score + 1)
          setChangeData(prev => ({
            bef: prev.cur,
            cur: 1,
          }))
        }}
      >
        <Plus />
      </button>
      {score()}
      <button
        class={buttonStyle}
        classList={{ 'text-background-blue-dark': score() < props.score }}
        onClick={() => {
          setScore(props.score - 1)
          setChangeData(prev => ({
            bef: prev.cur,
            cur: -1,
          }))
        }}
      >
        <Minus />
      </button>
    </div>
  );
};

export default ScoreCount;