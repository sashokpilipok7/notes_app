import { useState, useEffect, use } from "react";
import api from "utils/api";

import { Input, TextArea, Button } from "components";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await api.get("/notes");
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container">
      <h1>ST notes app</h1>
      <form>
        <Input
          type="text"
          placeholder="Title"
          value=""
          onChange={(value) => console.log(value)}
        />
        <TextArea
          placeholder="Content"
          value=""
          onChange={(value) => console.log(value)}
        />
        <Button type="submit">Submit</Button>
        {error && <div className="error">{error.message}</div>}
      </form>
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
export default HomePage;
