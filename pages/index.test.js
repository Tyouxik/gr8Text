import Home from "./index";
import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testutils";

const setup = () => {
  return shallow(<Home />);
};

test("should render without error", () => {
  const wrapper = setup();
  const homeComponent = findByTestAttr(wrapper, "home-component");
  expect(homeComponent.length).toBe(1);
});

test("should show a welcome title", () => {
  const wrapper = setup();
  const welcomeTitle = findByTestAttr(wrapper, "welcome-title").text();
  expect(welcomeTitle).toMatch(/welcome/i);
});
test("should render at least one link to courses page", () => {
  const wrapper = setup();
  const coursesLink = wrapper.find({ href: "/courses" });
  expect(coursesLink.length).toBe(1);
});
test("should render a link to dashboard page", () => {
  const wrapper = setup();
  const signupLink = wrapper.find({ href: "/dashboard" });
  expect(signupLink.length).toBeGreaterThanOrEqual(1);
});
