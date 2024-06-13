import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

export async function action({ request }) {
  const formData = await request.formData();
  const product = {
    title: formData.get("title"),
    body_html: formData.get("body_html"),
    vendor: formData.get("vendor"),
    product_type: formData.get("product_type"),
  };

  const res = await fetch("http://localhost:3000/api/products", {
    method: "POST",
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

export default function AddProduct() {
  const actionData = useActionData();
  return (
    <div>
      <h1>Add Product</h1>
      <Form method="post">
        <div>
          <label>
            Title:
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea name="body_html"></textarea>
          </label>
        </div>
        <div>
          <label>
            Vendor:
            <input type="text" name="vendor" />
          </label>
        </div>
        <div>
          <label>
            Product Type:
            <input type="text" name="product_type" />
          </label>
        </div>
        <button type="submit">Add Product</button>
        {actionData && actionData.error && <p>{actionData.error}</p>}
      </Form>
    </div>
  );
}
