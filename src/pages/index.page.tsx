import { createContext, For, Show } from 'solid-js';
import CommentBox from '$/components/organisms/CommentBox';
import YouCommentBox from '$/components/organisms/YouCommentBox';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import WriteCommentBox from '$/components/organisms/WriteCommentBox';
import { nanoid } from 'nanoid';
import { StoreProvider } from '$/hooks/useStore';

interface Comment {
  id: string,
  content: string,
  createdAt: number,
  score: number,
  user: User,
  replies: RepliesComment[]
}

export interface RepliesComment {
  id: string,
  content: string,
  createdAt: number,
  score: number,
  replyingTo: string,
  user: User
}

interface User {
  image: {
    png: string,
    webp: string
  },
  username: string
}

export interface PageProps {
  currentUser: User,
  comments: Comment[]
}


export const StoreContext = createContext<[get: Store<PageProps>, set: SetStoreFunction<PageProps>]>({} as any)


export const Page = (props: PageProps) => {
  const [store, setStore] = createStore({ ...props });

  return (
    <StoreProvider value={[store, setStore]}>
      <main class='flex justify-center text-background-blue-dark bg-background-blue-light'>
        <div class='min-h-screen space-y-8 py-8 max-w-250 w-screen'>
          <For each={store.comments}>{(comment, i) => {
            const boxProps = () => ({
              score: comment.score,
              text: comment.content,
              image: comment.user.image.webp,
              nick: comment.user.username,
              daysAgo: comment.createdAt,
              id: comment.id
            })

            return (
              <div>
                <Show
                  when={comment.user.username == props.currentUser.username}
                  children={<YouCommentBox {...boxProps()} onDelete={() => {
                    setStore('comments', prev => prev.filter(com => com.id != comment.id))
                  }} onEdit={(text) => {
                    setStore('comments', i(), 'content', text)
                  }} onScoreChange={(score) => {
                    setStore('comments', i(), 'score', score)
                  }} />}
                  fallback={<CommentBox {...boxProps()} onComment={(newComment) => {
                    setStore('comments', i(), 'replies', prev => [...prev, newComment])
                  }} onScoreChange={(score) => {
                    setStore('comments', i(), 'score', score)
                  }} />}
                />

                <Show when={comment.replies.length}>
                  <div class='flex max-w-250 mt-8'>
                    <div>
                      <hr class='flex-1 h-full w-[2px] my-4 mx-12 bg-black bg-opacity-5'/>
                    </div>
                    <div class='space-y-4 flex-1'>
                      <For each={comment.replies}>{(subComment) => {
                        const boxProps = () => ({
                          score: subComment.score,
                          text: subComment.content,
                          image: subComment.user.image.webp,
                          nick: subComment.user.username,
                          daysAgo: subComment.createdAt,
                          replyingTo: subComment.replyingTo,
                          id: subComment.id
                        })

                        return (
                          <Show
                            when={subComment.user.username == props.currentUser.username}
                            children={<YouCommentBox {...boxProps()} onDelete={() => {
                              setStore('comments', com => com.id == comment.id, 'replies', rep => rep.filter(com => com.id != subComment.id))
                            }} onScoreChange={(score) => {
                              setStore('comments', com => com.id == comment.id, 'replies', com => com.id == subComment.id, 'score', score)
                            }} />}
                            fallback={<CommentBox {...boxProps()} onComment={(newComment) => {
                              setStore('comments', i(), 'replies', prev => [...prev, newComment])
                            }} onScoreChange={(score) => {
                              setStore('comments', com => com.id == comment.id, 'replies', com => com.id == subComment.id, 'score', score)
                            }} />}
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
            setStore('comments', prev => [...prev, {
              id: nanoid(8),
              content: text,
              createdAt: 0,
              score: 0,
              user: props.currentUser,
              replies: []
            }])
            window.scrollTo(0,document.body.scrollHeight);
          }} />
        </div>
      </main>
    </StoreProvider>
  );
};