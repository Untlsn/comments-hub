import CommentHeader, { CommentHeaderProps } from '$/components/molecules/CommentHeader';
import ScoreCount from '$/components/atoms/ScoreCount';
import { Show } from 'solid-js';

interface CommentBoxProps extends CommentHeaderProps {
  score: number
  text: string
  replyOf?: string
}

const CommentBox = (props: CommentBoxProps) => {
  return (
    <div class='flex gap-8 bg-white p-8 rounded-xl w-full'>
      <div>
        <ScoreCount score={props.score} />
      </div>
      <article class='space-y-8'>
        <CommentHeader {...props} />
        <p class='text-xl text-main-grayish break-all'>
          <Show when={props.replyOf}>
            <span class='text-main-blue'>@{props.replyOf}</span>
          </Show> {props.text}
        </p>
      </article>
    </div>
  );
};

export default CommentBox;