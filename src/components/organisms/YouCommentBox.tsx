import YouCommentHeader  from '$/components/molecules/YouCommentHeader';
import ScoreCount from '$/components/atoms/ScoreCount';
import { createSignal, Show } from 'solid-js';
import { CommentHeaderProps } from '$/components/molecules/CommentHeader';

interface YouCommentBoxProps extends CommentHeaderProps {
  score: number
  text: string
  replyingTo?: string
  onDelete?(): void
}

const YouCommentBox = (props: YouCommentBoxProps) => {
  const [isEditMode, setIsEditMode] = createSignal(false);
  const [willDelete, setWillDelete] = createSignal(false);
  const [text, setText] = createSignal(props.text);

  return (
    <div class='flex gap-8 bg-white p-8 rounded-xl w-full'>
      <div>
        <ScoreCount score={props.score} />
      </div>
      <article class='space-y-8 w-full'>
        <YouCommentHeader
          {...props}
          onEdit={() => {
            setIsEditMode(v => !v)
            setWillDelete(false);
          }}
          isEditMode={isEditMode()}
          onDelete={() => {
            if (willDelete()) {
              props.onDelete?.()
            } else {
              setWillDelete(true)
            }
          }}
          willDelete={willDelete()}
        />
        <Show
          when={isEditMode()}
          children={<textarea
            class='w-full h-30 text-xl text-main-grayish resize-none border-1 p-2 rounded'
            value={text()}
            onKeyUp={(ev) => setText(ev.currentTarget.value)}
          />}
          fallback={<p class='text-xl text-main-grayish break-all'>
            <Show when={props.replyingTo}>
              <span class='text-main-blue'>@{props.replyingTo}</span>
            </Show> {text()}
        </p>}
        />
      </article>
    </div>
  );
};

export default YouCommentBox;