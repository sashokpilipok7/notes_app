import Button from "../../components/Button";

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content of the home page.</p>
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
    </div>
  );
}
export default HomePage;
