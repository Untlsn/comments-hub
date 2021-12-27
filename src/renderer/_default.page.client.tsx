import { hydrate, render } from 'solid-js/web'
import { useClientRouter } from 'vite-plugin-ssr/client/router'
import 'virtual:windi.css';
import 'virtual:windi-devtools';


let dispose: () => void

const { hydrationPromise } = useClientRouter({
  render(pageContext) {
    const content = document.getElementById('page-view')
    const { Page, pageProps } = pageContext

    // Dispose to prevent duplicate pages when navigating.
    if (dispose) dispose()

    // Render the page
    if (pageContext.isHydration) {
      // This is the first page rendering; the page has been rendered to HTML
      // and we now make it interactive.
      dispose = hydrate(
        () => (
          <Page {...pageProps} />
        ),
        content!,
      )
    } else {
      // Render new page
      render(
        () => (
          <Page {...pageProps} />
        ),
        content!,
      )
    }
  },
  onTransitionStart,
  onTransitionEnd,
})

hydrationPromise.then(() => {
  console.log('Hydration finished; page is now interactive.')
})

function onTransitionStart() {
  console.log('Page transition start')
}
function onTransitionEnd() {
  console.log('Page transition end')
}
