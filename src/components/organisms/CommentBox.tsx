import CommentHeader, { CommentHeaderProps } from '$/components/molecules/CommentHeader';
import ScoreCount from '$/components/atoms/ScoreCount';

interface CommentBoxProps extends CommentHeaderProps {
  score: number
  text: string
}

const CommentBox = (props: CommentBoxProps) => {
  return (
    <div class='flex gap-8 bg-white p-8 rounded-xl w-full'>
      <div>
        <ScoreCount score={props.score} />
      </div>
      <article class='space-y-8'>
        <CommentHeader {...props} />
        <p class='text-xl text-main-grayish break-all'>{props.text}</p>
      </article>
    </div>
  );
};

export default CommentBox;