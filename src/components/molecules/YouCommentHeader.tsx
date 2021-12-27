import AgoCounter from '$/components/atoms/AgoCounter';
import Delete from '$/components/svg/Delete';
import Edit from '$/components/svg/Edit';
import { Show } from 'solid-js';

export interface YouCommentHeaderProps {
  image: string,
  nick: string
  // Automatically converted into weeks, months and years
  daysAgo: number
  onDelete?(): void
  onEdit?(): void
  willDelete: boolean
  isEditMode: boolean
}

const YouCommentHeader = (props: YouCommentHeaderProps) => {

  return (
    <h1 class='flex items-center gap-6 text-xl w-full'>
      <img src={props.image} alt="user image" class='h-12'/>
      <p class='font-bold'>{props.nick}</p>
      <p class='text-xl bg-main-blue text-white px-2 pb-1 rounded'>you</p>
      <p class='flex-1 text-main-grayish'>
        <AgoCounter days={props.daysAgo} />
      </p>
      <button
        onClick={props.onDelete} class='flex items-center gap-4 text-main-red hover:text-opacity-20'>
        <Delete /> <Show when={props.willDelete} children='Sure?' fallback='Delete' />
      </button>
      <button
        onClick={props.onEdit} class='flex items-center gap-4 text-main-blue hover:text-opacity-20'>
        <Edit /> <Show when={props.isEditMode} children='Cancel' fallback='Edit' />
      </button>
    </h1>
  );
};

export default YouCommentHeader;