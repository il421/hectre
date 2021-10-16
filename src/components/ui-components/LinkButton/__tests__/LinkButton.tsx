import { shallow, ShallowWrapper } from "enzyme";

import { LinkButton } from "../LinkButton";

test("should match previous snapshot", () => {
  const wrapper: ShallowWrapper<typeof LinkButton> = shallow<typeof LinkButton>(
    <LinkButton>test</LinkButton>
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
