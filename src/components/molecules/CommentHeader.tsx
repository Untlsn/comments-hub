import AgoCounter from '$/components/atoms/AgoCounter';
import Reply from '$/components/svg/Reply';
import { Show } from 'solid-js';

export interface CommentHeaderProps {
  image: string,
  nick: string
  // Automatically converted into weeks, months and years
  daysAgo: number
  you?: boolean,
}

const CommentHeader = (props: CommentHeaderProps) => {


  return (
    <h1 class='flex items-center gap-6 text-2xl w-full'>
      <img src={props.image} alt="user image"/>
      <p class='font-bold'>{props.nick}</p>
      <Show when={props.you}>
        <p class='text-xl bg-main-blue text-white px-2 pb-1 rounded'>you</p>
      </Show>
      <p class='flex-1 text-main-grayish'>
        <AgoCounter days={props.daysAgo} />
      </p>
      <p class='text-main-blue flex items-center gap-4'>
        <Reply />
        Reply
      </p>
    </h1>
  );
};

export default CommentHeader;