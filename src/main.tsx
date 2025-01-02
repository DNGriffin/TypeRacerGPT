import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import { MainMenu } from './pages/MainMenu.tsx'
import { SinglePlayer } from './pages/SinglePlayer.tsx'
import { StorySelector } from './pages/StorySelector.tsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/singleplayer" element={<StorySelector type='singleplayer' />} />
          <Route path="/singleplayer/:storyId" element={<SinglePlayer />} />

        </Routes>
      </StrictMode>
    </BrowserRouter>
  </MantineProvider>
)
