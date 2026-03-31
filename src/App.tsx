import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const GestureGamePage = lazy(() => import("./components/GestureGamePage"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const params = new URLSearchParams(window.location.search);
  const game = params.get("game");

  if (game) {
    return (
      <Suspense>
        <GestureGamePage />
      </Suspense>
    );
  }

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
