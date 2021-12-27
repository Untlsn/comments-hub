import { createSignal } from 'solid-js';

interface WriteCommentBoxProps {
  image: string,
  onSend?(text: string): void
  buttonText?: string
  focus?: boolean
}

const WriteCommentBox = (props: WriteCommentBoxProps) => {
  const [text, setText] = createSignal('');

  const submit = () => {
    props.onSend?.(text());
    setText('');
  }

  return (
    <form onSubmit={(ev) => {
      ev.preventDefault();
      submit();
    }} class='flex w-full bg-white p-6 gap-4'>
      <p><img src={props.image} alt="your avatar"/></p>
      <textarea
        ref={textarea => setTimeout(() => textarea?.focus(), 1)}
        onKeyUp={ev => {
          if (ev.key == 'Enter') submit();
          else setText(ev.currentTarget.value)
        }}
        value={text()}
        class='resize-none h-30 flex-1 border-1 p-4 rounded hocus:border-black'
        placeholder='Add a comment...'
      />
      <p><button type='submit' class='uppercase py-4 px-8 font-bold bg-main-blue text-white rounded-lg hover:bg-opacity-30'>
        {props.buttonText || 'send'}
      </button></p>
    </form>
  );
};

export default WriteCommentBox;