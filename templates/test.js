module.exports = (nameComponent) => (
`import React from "react";
import { mount } from "enzyme";
import ${nameComponent} from "./";

it("Should mount component", () => {
    const wrap = mount(<${nameComponent} />);
    expect(wrap.find("strong").at(0).text()).toEqual("Hello stranger, ${nameComponent}!");
});
`
)