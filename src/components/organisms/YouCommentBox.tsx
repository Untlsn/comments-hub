import YouCommentHeader  from '$/components/molecules/YouCommentHeader';
import ScoreCount from '$/components/atoms/ScoreCount';
import { createSignal, Show } from 'solid-js';
import { CommentHeaderProps } from '$/components/molecules/CommentHeader';

interface YouCommentBoxProps extends CommentHeaderProps {
  score: number
  text: string
  replyingTo?: string
  onDelete?(): void
  onEdit?(text: string): void
  onScoreChange?(score: number): void
}

const YouCommentBox = (props: YouCommentBoxProps) => {
  const [isEditMode, setIsEditMode] = createSignal(false);
  const [willDelete, setWillDelete] = createSignal(false);
  const [text, setText] = createSignal(props.text);

  const submit = () => {
    props.onEdit?.(text());
    setIsEditMode(false);
  }

  return (
    <div class='flex gap-8 bg-white p-8 rounded-xl w-full'>
      <div>
        <ScoreCount score={props.score} onChange={props.onScoreChange} />
      </div>
      <article class='space-y-8 w-full'>
        <YouCommentHeader
          {...props}
          onEdit={() => {
            setIsEditMode(v => !v)
            setWillDelete(false);
            setText(props.text);
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
          children={(
            <div class='space-y-2'>
              <textarea
                class='w-full h-30 text-xl text-main-grayish resize-none border-1 p-2 rounded hocus:border-black'
                value={text()}
                onKeyUp={(ev) => {
                  if (ev.key == 'Enter') submit();
                  else setText(ev.currentTarget.value);
                }}
              />
              <p class='flex justify-end'>
                <button
                  type='submit'
                  class='uppercase py-4 px-8 font-bold bg-main-blue text-white rounded-lg hover:bg-opacity-30'
                  onClick={submit}
                >
                  Update
                </button>
              </p>
            </div>
          )}
          fallback={(
            <p class='text-xl text-main-grayish break-all'>
              <Show when={props.replyingTo}>
                <span class='text-main-blue'>@{props.replyingTo}</span>
              </Show> {props.text}
            </p>
          )}
        />
      </article>
    </div>
  );
};

export default YouCommentBox;