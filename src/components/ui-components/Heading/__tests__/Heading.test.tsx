import { shallow, ShallowWrapper } from "enzyme";

import { Heading } from "../Heading";

test("should match previous snapshot", () => {
  const wrapper: ShallowWrapper<typeof Heading> = shallow<typeof Heading>(
    <Heading level="second" />
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
