import { shopify } from "../../shopify.server";

export const createProduct = async (req, res) => {
  try {
    const session = await shopify.authenticate(req, res);
    const { title, body_html, vendor, product_type } = req.body;

    const response = await shopify.rest.Product.create({
      session,
      body: {
        product: { title, body_html, vendor, product_type },
      },
    });

    res.status(201).json(response.product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const session = await shopify.authenticate(req, res);
    const products = await shopify.rest.Product.all({ session });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const session = await shopify.authenticate(req, res);
    const { id } = req.params;
    const { title, body_html, vendor, product_type } = req.body;

    const response = await shopify.rest.Product.update({
      session,
      id,
      body: {
        product: { title, body_html, vendor, product_type },
      },
    });

    res.status(200).json(response.product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const session = await shopify.authenticate(req, res);
    const { id } = req.params;

    await shopify.rest.Product.delete({
      session,
      id,
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
