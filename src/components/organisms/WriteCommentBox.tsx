import { createSignal } from 'solid-js';

interface WriteCommentBoxProps {
  image: string,
  onSend?(text: string): void
  buttonText?: string
}

const WriteCommentBox = (props: WriteCommentBoxProps) => {
  const [text, setText] = createSignal('');

  return (
    <form onSubmit={(ev) => {
      ev.preventDefault();
      props.onSend?.(text());
    }} class='flex w-full bg-white p-6 gap-4'>
      <p><img src={props.image} alt="your avatar"/></p>
      <textarea onKeyUp={ev => setText(ev.currentTarget.value)} class='resize-none h-30 flex-1 border-1 p-4' placeholder='Add a comment...' />
      <p><button type='submit' class='uppercase py-4 px-8 font-bold bg-main-blue text-white rounded-lg'>{props.buttonText || 'send'}</button></p>
    </form>
  );
};

export default WriteCommentBox;