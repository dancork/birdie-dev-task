import React from 'react'
import styled from 'styled-components'

import Logo from './logo'

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 88px auto;
  grid-template-columns: 1fr 960px 1fr;
  grid-template-areas: 
    ". header. "
    ". main. ";
`

const Header = styled.header`
  grid-area: header;
  display: grid;
  align-content: center;
`

const Main = styled.main`
  grid-area: main;
`

const StyledLogo = styled(Logo)`
  height: 40px;
`

const App: React.FC = ({ children }) =>
  <AppContainer>
    <Header>
      <StyledLogo />
    </Header>
    <Main>
      {children}
    </Main>
  </AppContainer>

export default App
