import { type } from "os";
import build from "./";

const createFeeddbackSpy = jest.fn()
const sendEmailSpy = jest.fn()


describe("Build", () => {
  test("should build string correctly - Center", async () => {
    const result = await build({
      value: 'Bruno',
      caracteres: ' ',
      borderLeft: '|',
      borderRight: '|',
      align: 'Center',
      limit: 20,
    });
    expect(result).toBe('|       Bruno       |');
  }); 
  test("should build string correctly - Left", async () => {
    const result = await build({
      value: 'Bruno',
      caracteres: ' ',
      borderLeft: '|',
      borderRight: '|',
      align: 'Left',
      limit: 20,
    });
    expect(result).toBe('Bruno');
  }); 
  test("should build string correctly - Center", async () => {
    const result = await build({
      value: 'Sajermann',
      caracteres: ' ',
      borderLeft: '|',
      borderRight: '|',
      align: 'Center',
      limit: 20,
    });
    expect(result).toBe('|     Sajermann     |');
  }); 
  test("should build string correctly - Center", async () => {
    const result = await build({
      value: '1234',
      caracteres: ' ',
      borderLeft: '|',
      borderRight: '|',
      align: 'Center',
      limit: 20,
    });
    expect(result).toBe('|       1234        |');
  }); 
});
