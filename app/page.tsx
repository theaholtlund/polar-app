// Define home page component for the app
export default function App() {
  return (
    <section className="py-24 text-center">
      <link rel="icon" href="/favicon.ico?" type="image/x-icon" />
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight">
          Polar Data Analysis
        </h1>
        <img src="/logo-2.webp" alt="Logo" className="mx-auto w-32 mt-4" />
        <p className="mt-20 text-lg font-medium">
          Sign in to get started analysing your Polar training data :)
        </p>
      </div>
    </section>
  );
}
