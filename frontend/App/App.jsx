import RenderRoutes from "./routes";
import Theme from "/features/Theme";

function App() {
  return (
    <>
      <Theme
        title="Coding Family - Where Innovation is Home"
        description="Where Innovation is Home."
        logo="Coding Family"
      >
        <RenderRoutes />
      </Theme>
    </>
  );
}

export default App;
