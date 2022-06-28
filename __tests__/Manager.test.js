import Manager from "../lib/Manager.js";

test('creates a manager object', () => {
    const manager = new Manager('michael');

    expect(manager.name).toBe('michael');
    expect(manager.id).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.role).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test("gets manager's role", () => {
    const manager = new Manager('michael');

    expect(manager.getRole()).toEqual(expect.any(String));
})