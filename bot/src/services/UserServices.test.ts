jest.mock('../repositories/UserRepository')
jest.mock('../services/UserServices')
import { UserRepository } from "../repositories/UserRepository";
import { UserServices } from "./UserServices";

describe("Build", () => {
  test("should bataata", async () => {
    const userRepository = new UserRepository();
    console.log({userRepository})
    console.log({UserRepository})
    jest.spyOn(userRepository, "getUserIdByUsername").mockResolvedValue("1");
    jest
      .spyOn(userRepository, "getStatsByUserId")
      .mockResolvedValue({ user: "test" });
      const userServices = new UserServices();
      const result = await userServices.getStats("1")
      expect(result).toBe({ user: "test" });
  });
});
