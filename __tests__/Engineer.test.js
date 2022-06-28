import Engineer from "../lib/Engineer.js";

test('creates an Engineer object', () => {
    const engineer = new Engineer('michael');

    expect(engineer.github).toEqual(expect.any(String));
    expect(engineer.name).toBe('michael');
    expect(engineer.id).toEqual(expect.any(String));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.role).toEqual(expect.any(String));
});

test("get engineer's github as an object", () => {
    const engineer = new Engineer('michael');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

test('get engineer role', () => {
    const engineer = new Engineer('michael');

    expect(engineer.getRole()).toEqual(expect.any(String));
});