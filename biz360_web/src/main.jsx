import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import { Provider } from "react-redux"; 
import { store } from "./store/store";
import { WebRouter } from "./routes/web_router";
import { StyledThemeProvider } from "./styles/styleThemeProvider";
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <StyledThemeProvider>
        <WebRouter/> 
      </StyledThemeProvider>
    </Provider>
  </StrictMode>
)
