import { shallow, ShallowWrapper } from "enzyme";

import { DetailList } from "../DetailList";

test("should match previous snapshot", () => {
  const wrapper: ShallowWrapper<typeof DetailList> = shallow<typeof DetailList>(
    <DetailList
      items={[
        { text1: "text1", text2: "text2" },
        { text1: "text3", text2: "text4" }
      ]}
      columns={[
        {
          name: "title1",
          maxWidth: 0,
          minWidth: 0,
          onRender: item => item.text1
        },
        {
          name: "title2",
          maxWidth: 0,
          minWidth: 0,
          onRender: item => item.text2
        }
      ]}
    />
  );
  expect(wrapper.debug()).toMatchSnapshot();
});
