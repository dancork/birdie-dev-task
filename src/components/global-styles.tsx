import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*, *:after, *:before {
  box-sizing: inherit;
}
body {
  margin: 0;
  padding: 0;
  font-family: "Nunito Sans", sans-serif;
}
#__next {
}
`

export default GlobalStyles
