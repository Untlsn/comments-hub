import { For, Show } from 'solid-js';
import CommentBox from '$/components/organisms/CommentBox';
import YouCommentBox from '$/components/organisms/YouCommentBox';
import { createStore, produce } from 'solid-js/store';
import WriteCommentBox from '$/components/organisms/WriteCommentBox';
import { nanoid } from 'nanoid';

interface Comment {
  id: string,
  content: string,
  createdAt: number,
  score: number,
  user: {
    image: {
      png: string,
      webp: string
    },
    username: string
  },
  replies: {
    "id": string,
    "content": string,
    "createdAt": number,
    "score": number,
    "replyingTo": string,
    "user": {
      "image": {
        "png": string,
        "webp": string
      },
      "username": string
    }
  }[]
}

interface PageProps {
  currentUser: {
    image: {
      png: string,
      webp: string
    },
    username: string
  },
  comments: Comment[]
}

export const Page = (props: PageProps) => {
  const [store, setStore] = createStore({ comments: props.comments });


  return (
    <main class='flex justify-center text-background-blue-dark bg-background-blue-light'>
      <div class='min-h-screen space-y-8 py-8 max-w-250 w-screen'>
        <For each={store.comments}>{(comment, i) => {
          const boxProps = {
            score: comment.score,
            text: comment.content,
            image: comment.user.image.webp,
            nick: comment.user.username,
            daysAgo: comment.createdAt,
          }

          return (
            <div>
              <Show
                when={comment.user.username == props.currentUser.username}
                children={<YouCommentBox {...boxProps} onDelete={() => {
                  console.log(comment.id);
                  setStore('comments', prev => prev.filter(com => com.id != comment.id))
                }}
                />}
                fallback={<CommentBox {...boxProps} />}
              />

              <Show when={comment.replies.length}>
                <div class='flex max-w-250 mt-8'>
                  <div>
                    <hr class='flex-1 h-full w-[2px] my-4 mx-12 bg-black bg-opacity-5'/>
                  </div>
                  <div class='flex flex-col gap-4'>
                    <For each={comment.replies}>{(subComment) => {
                      const boxProps = {
                        score: subComment.score,
                        text: subComment.content,
                        image: subComment.user.image.webp,
                        nick: subComment.user.username,
                        daysAgo: subComment.createdAt,
                      }

                      return (
                        <Show
                          when={subComment.user.username == props.currentUser.username}
                          children={<YouCommentBox {...boxProps} onDelete={() => {
                            setStore('comments', i(), 'replies', rep => rep.filter(com => com.id != subComment.id))
                          }} />}
                          fallback={<CommentBox {...boxProps} />}
                        />
                      )
                    }}</For>
                  </div>
                </div>
              </Show>
            </div>
          );
        }}</For>
        <WriteCommentBox image={props.currentUser.image.webp} onSend={(text) => {
          setStore('comments', produce((prev: Comment[]) => {
            prev.push({
              id: nanoid(8),
              content: text,
              createdAt: 0,
              score: 0,
              user: props.currentUser,
              replies: []
            })
          }))
          window.scrollTo(0,document.body.scrollHeight);
        }} />
      </div>
    </main>
  );
};