import { getHello } from "../getHello";

const res = {
  json: jest.fn(),
};

const req = {};

test("responds json", () => {
  getHello(req, res);

  expect(res.json).toHaveBeenCalled();
});
