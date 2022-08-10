import { GlobalStateProvider, ICProvider, ThemeProvider } from '@fe/providers'
import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <GlobalStateProvider>
      <ICProvider>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </ICProvider>
    </GlobalStateProvider>
  )
}
