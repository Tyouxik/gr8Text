import { ShallowWrapper } from "enzyme";

import CheckPropTypes from "check-prop-types";

/** Return node(s) with the given data-test attribute.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper
 * @param {String} val
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Check if propTypes is correct for the given component
 * @param {JSX.component} component
 * @param {object} conformingProps
 */

export const checkProps = (component, conformingProps) => {
  const propError = CheckPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
