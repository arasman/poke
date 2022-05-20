import Document from 'next/document'
import {ServerStyleSheet} from 'styled-components'

//https://styled-components.com/docs/advanced#server-side-rendering
//https://github.com/vercel/next.js/tree/canary/examples/with-styled-components-babel
//https://github.com/vercel/next.js/blob/canary/examples/with-styled-components-babel/pages/_document.tsx
/*
This needs as prerequisites:
npm i -S styled-components
npm i -D babel-plugin-styled-components
addition of the file .babelrc in the root
creation of this file document.js
*/
export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet() //Creating a style sheet but server side
        const originalRenderPage = ctx.renderPage
        try
        {
            ctx.renderPage = () => {
                originalRenderPage({
                    enhanceApp: App => props => 
                        sheet.collectStyles(<App {...props}/>)
                })
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                style: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement}
                    </>
                )
            }
        }
        }finally {
            sheet.seal()
        }
    } 
}