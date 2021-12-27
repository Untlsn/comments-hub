import Plus from '$/components/svg/Plus';
import Minus from '$/components/svg/Minus';
import { createEffect, createSignal } from 'solid-js';

interface ScoreCountProps {
  score: number
  onChange?(score: number): void
}

const buttonStyle = 'h-10 w-10 flex items-center justify-center text-[#C5C6EF] hover:text-background-blue-dark'

const ScoreCount = (props: ScoreCountProps) => {
  const [score, setScore] = createSignal(props.score);

  createEffect(() => {
    // on second click on same button, score will reset
    if (score() > props.score + 1 || score() < props.score - 1) setScore(props.score);
    // prevent from returning score + 2 or score - 2
    else props.onChange?.(score());
  })

  return (
    <div class='text-center font-bold bg-background-blue-light rounded-xl text-lg'>
      <button class={buttonStyle} onClick={() => setScore(v => v+1)}>
        <Plus />
      </button>
      {score()}
      <button class={buttonStyle} onClick={() => setScore(v => v+1)}>
        <Minus />
      </button>
    </div>
  );
};

export default ScoreCount;