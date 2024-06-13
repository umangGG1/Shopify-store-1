import { useLoaderData, Form, Link } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const res = await fetch(`http://localhost:3000/api/products?query=${query}`);
  const products = await res.json();
  return json(products);
}

export default function Index() {
  const products = useLoaderData();

  return (
    <div>
      <h1>Products</h1>
      <Form method="get">
        <input type="text" name="query" placeholder="Search products" />
        <button type="submit">Search</button>
      </Form>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
            <Link to={`/edit-product/${product.id}`}>Edit</Link>
            <Form action={`/delete-product/${product.id}`} method="post">
              <button type="submit">Delete</button>
            </Form>
          </li>
        ))}
      </ul>
      <Link to="/add-product">Add Product</Link>
    </div>
  );
}
