import AgoCounter from '$/components/atoms/AgoCounter';
import Reply from '$/components/svg/Reply';

export interface CommentHeaderProps {
  image: string,
  nick: string
  // Automatically converted into weeks, months and years
  daysAgo: number
}

const CommentHeader = (props: CommentHeaderProps) => {


  return (
    <h1 class='flex items-center gap-6 text-xl w-full'>
      <img src={props.image} alt="user image" class='h-12'/>
      <p class='font-bold'>{props.nick}</p>
      <p class='flex-1 text-main-grayish'>
        <AgoCounter days={props.daysAgo} />
      </p>
      <button class='text-main-blue flex items-center gap-4'>
        <Reply /> Reply
      </button>
    </h1>
  );
};

export default CommentHeader;