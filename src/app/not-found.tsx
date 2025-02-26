import Layout from "./components/Layout/Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>

    </Layout>
  );
}
