import Layout from "/features/Layout";
import RenderRoutes from "./routes";

function App() {
  console.log(import.meta.env.DEV);
  return (
    <>
      <Layout
        title="Coding Family - Where Innovation is Home"
        description="Where Innovation is Home."
        logo="Coding Family"
      >
        <RenderRoutes />
      </Layout>
    </>
  );
}

export default App;
