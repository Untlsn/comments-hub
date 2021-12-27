import { For, Show } from 'solid-js';
import CommentBox from '$/components/organisms/CommentBox';
import YouCommentBox from '$/components/organisms/YouCommentBox';
import { createStore } from 'solid-js/store';

interface PageProps {
  currentUser: {
    image: {
      png: string,
      webp: string
    },
    username: string
  },
  comments: {
    id: number,
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
      "id": number,
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
  }[]
}

export const Page = (props: PageProps) => {
  const [comments, setComments] = createStore(props.comments);

  return (
    <main class='flex flex-col items-center justify-center min-h-screen text-background-blue-dark bg-background-blue-light gap-8 py-8'>
      <For each={comments}>{(comment, i) => {
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
                setComments(prev => prev.filter(com => com.id != comment.id))
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
                          setComments(i(), 'replies', rep => rep.filter(com => com.id != subComment.id))
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
    </main>
  );
};