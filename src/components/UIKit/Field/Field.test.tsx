import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { Form, Formik } from "formik";

import Field from "./Field";

const mockValidate = (values: any) => {
  const errors: Record<string, string> = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  return errors;
};

const createForm = (fieldname: string, value: string, children: ReactNode) => (
  <Formik initialValues={{ [fieldname]: value }} validate={mockValidate} onSubmit={jest.fn()}>
    <Form>{children}</Form>
  </Formik>
);

describe("Field Component", () => {
  it("Renders input field by default", () => {
    render(createForm("name", "", <Field name="name" />));

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("Renders textarea when multiple is true", () => {
    render(createForm("name", "", <Field name="name" multiple />));

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("Handles input change correctly", async () => {
    render(createForm("name", "", <Field name="name" />));

    const input = screen.getByRole("textbox");
    await act(() => fireEvent.change(input, { target: { value: "New name" } }));

    expect(input).toHaveValue("New name");
  });

  it("Displays error message when field is invalid", async () => {
    render(createForm("name", "", <Field name="name" />));

    const input = screen.getByRole("textbox");
    fireEvent.blur(input);

    const errorMessage = await screen.findByText("Name is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("Does not display error when field is valid", async () => {
    render(createForm("name", "Valid name", <Field name="name" />));

    const input = screen.getByRole("textbox");
    await act(() => fireEvent.blur(input));

    const errorMessage = screen.queryByText("Name is required");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("Renders custom placeholder text", () => {
    render(createForm("name", "", <Field name="name" placeholder="Custom Placeholder" />));

    const input = screen.getByPlaceholderText("Custom Placeholder");
    expect(input).toBeInTheDocument();
  });
});
