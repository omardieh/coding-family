import Layout from "./components/Layout";
import RenderRoutes from "./routes";

function App() {
  return (
    <Layout
      title="Coding Family - Where Innovation is Home"
      description="Where Innovation is Home."
      logo="Coding Family"
    >
      <RenderRoutes />
    </Layout>
  );
}

export default App;
