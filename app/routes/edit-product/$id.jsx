import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

export async function loader({ params }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product = await res.json();
  return json(product);
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const product = {
    title: formData.get("title"),
    body_html: formData.get("body_html"),
    vendor: formData.get("vendor"),
    product_type: formData.get("product_type"),
  };

  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (res.ok) {
    return redirect("/");
  }

  const error = await res.json();
  return json(error, { status: res.status });
}

export default function EditProduct() {
  const product = useLoaderData();
  const actionData = useActionData();
  return (
    <div>
      <h1>Edit Product</h1>
      <Form method="post">
        <div>
          <label>
            Title:
            <input type="text" name="title" defaultValue={product.title} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea name="body_html" defaultValue={product.body_html}></textarea>
          </label>
        </div>
        <div>
          <label>
            Vendor:
            <input type="text" name="vendor" defaultValue={product.vendor} />
          </label>
        </div>
        <div>
          <label>
            Product Type:
            <input type="text" name="product_type" defaultValue={product.product_type} />
          </label>
        </div>
        <button type="submit">Update Product</button>
        {actionData && actionData.error && <p>{actionData.error}</p>}
      </Form>
    </div>
  );
}
