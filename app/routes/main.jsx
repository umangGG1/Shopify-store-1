// index.jsx

import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { Page, Card, Text, Button, Form, FormLayout, TextField, Toast, Frame } from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { AppProvider } from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  // Implement CRUD operations here using Shopify API
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const shopify = useAppBridge();
  const [toastActive, setToastActive] = useState(false);

  useEffect(() => {
    if (actionData?.product) {
      setToastActive(true);
    }
  }, [actionData]);

  const toggleToast = () => setToastActive((active) => !active);

  const handleSubmit = async () => {
    await submit({}, { replace: true, method: "POST" });
  };

  return (
    <AppProvider>
      {/* Wrap your component with the Frame component */}
      <Frame>
        <Page>
          <TitleBar title="Shopify App Template" />
          <Card sectioned>
            <Text>
              This is a basic Shopify app template that allows CRUD operations
              on products.
            </Text>
          </Card>
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <Button primary onClick={handleSubmit}>
                  Generate Product
                </Button>
              </FormLayout>
            </Form>
          </Card>
          {/* Ensure the Toast component is properly used */}
          <Toast
            content="Product Created"
            onDismiss={toggleToast}
            active={toastActive}
          />
        </Page>
      </Frame>
    </AppProvider>
  );
}
