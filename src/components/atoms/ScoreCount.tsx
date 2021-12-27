import Plus from '$/components/svg/Plus';
import Minus from '$/components/svg/Minus';
import { createSignal } from 'solid-js';

interface ScoreCountProps {
  score: number
  onChange?(score: number): void
}

const buttonStyle = 'h-10 w-12 flex items-center justify-center text-[#C5C6EF] hover:text-background-blue-dark'

const ScoreCount = (props: ScoreCountProps) => {
  const [score, setScore] = createSignal(props.score);
  const [changeVersion, setChangeVersion] = createSignal(0);

  return (
    <div class='text-center font-bold bg-background-blue-light rounded-xl text-lg'>
      <button
        class={`${buttonStyle} ${changeVersion() == 1 ? 'text-background-blue-dark' : ''}`}
        onClick={() => {
          switch (changeVersion()) {
            case 1: {
              setScore(v => v - 1);
              setChangeVersion(0);
              break;
            }
            case 0: {
              setScore(v => v + 1);
              setChangeVersion(1);
              break;
            }
            case -1: {
              setScore(v => v + 2);
              setChangeVersion(1);
              break;
            }
          }
        }}
      >
        <Plus />
      </button>
      {score()}
      <button
        class={`${buttonStyle} ${changeVersion() == -1 ? 'text-background-blue-dark' : ''}`}
        onClick={() => {
          switch (changeVersion()) {
            case 1: {
              setScore(v => v - 2);
              setChangeVersion(-1);
              break;
            }
            case 0: {
              setScore(v => v - 1);
              setChangeVersion(-1);
              break;
            }
            case -1: {
              setScore(v => v + 1);
              setChangeVersion(0);
              break;
            }
          }
        }}
      >
        <Minus />
      </button>
    </div>
  );
};

export default ScoreCount;