import { Canvas } from 'pages/Canvas/Canvas.controller'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Menu } from './App.components/Menu/Menu.controller'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import { configureStore } from './App.store'
import { AppContainer } from './App.style'
import { Home } from 'pages/Home/Home.controller'

export const store = configureStore({})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:canvasId" element={<Canvas />} />
          </Routes>
        </AppContainer>
        <Toaster />
      </BrowserRouter>
    </Provider>
  )
}
