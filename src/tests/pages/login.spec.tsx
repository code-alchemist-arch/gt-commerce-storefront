import React from "react";

import { act, render, fireEvent } from "../test-utils";
import LoginPage from "../../pages/account/login";

jest.mock("next/router");

describe("Login", () => {
  let expectedSignIn, expectedEmail, expectedPassword, expectedRouterPush;

  beforeEach(() => {
    expectedRouterPush = jest.fn();
    expectedSignIn = jest.fn();
    expectedSignIn.mockResolvedValue("");
    expectedEmail = "demo@user.com";
    expectedPassword = "123";
  });

  test("should redirect on sign in", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <LoginPage />
    );
    const email = getByPlaceholderText("demo@demo.com");
    const password = getByPlaceholderText("demo");
    const signInButton = getByTestId("login-submit");

    await act(async () => {
      fireEvent.change(email, { target: { value: expectedEmail } });
      fireEvent.change(password, { target: { value: expectedPassword } });
      fireEvent.click(signInButton);
    });
  });
});
