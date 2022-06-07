import { UserRepository } from "../repositories/UserRepository";
import { UserServices } from "./UserServices";
jest.mock('../repositories/UserRepository');

function delay(): Promise<string> {
	return new Promise(resolve => {
		setTimeout(() => resolve("1"), 1000);
	});
}

describe("UserServices", () => {

  test("should execute with success", async () => {
    expect(UserRepository).not.toHaveBeenCalled();
    const userRepository = new UserRepository();
    expect(UserRepository).toHaveBeenCalledTimes(1);
    const userServices = new UserServices();
    const batata = delay;
    jest.spyOn(userRepository, 'getUserIdByUsername').mockImplementation(batata);
    const result = await userServices.getStats("1", "xbl");
    // TODO: Resolver esse teste
    // expect(result).toBe("1");
  });
});
