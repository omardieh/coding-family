import Layout from "./components/Layout";
import RenderRoutes from "./routes";

const siteLogo = "Coding Family";
const siteSlogan = "Where Innovation is Home.";

function App() {
  return (
    <Layout siteSlogan={siteSlogan} siteLogo={siteLogo}>
      <RenderRoutes />
    </Layout>
  );
}

export default App;
