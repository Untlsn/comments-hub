import { For, Show } from 'solid-js';
import CommentBox from '$/components/organisms/CommentBox';

interface PageProps {
  comments: {
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
}

export const Page = (props: PageProps) => {

  return (
    <main class='flex flex-col items-center justify-center min-h-screen text-background-blue-dark bg-background-blue-light gap-8 py-8'>
      <For each={props.comments.comments}>{(comment) => {
        return (
          <div>
            <CommentBox
              score={comment.score}
              text={comment.content}
              image={comment.user.image.webp}
              nick={comment.user.username}
              daysAgo={comment.createdAt}
            />
            <Show when={comment.replies.length}>
              <div class='flex max-w-250 mt-8'>
                <div>
                  <hr class='flex-1 h-full w-[2px] my-4 mx-12 bg-black bg-opacity-5'/>
                </div>
                <div class='flex flex-col gap-4'>
                  <For each={comment.replies}>{(subComment) => {
                    return (
                      <CommentBox
                        score={subComment.score}
                        text={subComment.content}
                        image={subComment.user.image.webp}
                        nick={comment.user.username}
                        daysAgo={comment.createdAt}
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