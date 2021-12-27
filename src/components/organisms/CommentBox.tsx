import CommentHeader, { CommentHeaderProps } from '$/components/molecules/CommentHeader';
import ScoreCount from '$/components/atoms/ScoreCount';
import { createSignal, Show } from 'solid-js';
import WriteCommentBox from '$/components/organisms/WriteCommentBox';
import { useStore } from '$/hooks/useStore';
import { RepliesComment } from '$/pages/index.page';
import { nanoid } from 'nanoid';

interface CommentBoxProps extends CommentHeaderProps {
  score: number
  text: string
  replyingTo?: string
  id: string
  onComment?(comment: RepliesComment): void
}

const CommentBox = (props: CommentBoxProps) => {
  const [isReplayMode, setIsReplayMode] = createSignal(false);
  const [store] = useStore();



  return (
    <>
      <div class='flex gap-8 bg-white p-8 rounded-xl w-full'>
        <div>
          <ScoreCount score={props.score} />
        </div>
        <article class='space-y-8'>
          <CommentHeader {...props} onReply={() => setIsReplayMode(v => !v)} />
          <p class='text-xl text-main-grayish break-all'>
            <Show when={props.replyingTo}>
              <span class='text-main-blue'>@{props.replyingTo}</span>
            </Show> {props.text}
          </p>
        </article>
      </div>
      <Show when={isReplayMode()}>
        <WriteCommentBox
          image={store.currentUser.image.webp}
          buttonText='reply'
          onSend={(text) => {
            console.log(props.nick);
            setIsReplayMode(false);
            props.onComment?.({
              id: nanoid(8),
              content: text,
              createdAt: 0,
              score: 0,
              replyingTo: props.nick,
              user: store.currentUser,
            })
          }}
        />
      </Show>
    </>
  );
};

export default CommentBox;