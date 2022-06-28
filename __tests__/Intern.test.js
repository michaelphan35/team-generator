import Intern from "../lib/Intern.js";

test('creates intern object', () => {
    const intern = new Intern('michael');

    expect(intern.name).toBe('michael');
    expect(intern.id).toEqual(expect.any(String));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.role).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
});

test("gets intern's school", () => {
    const intern = new Intern('michael');

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});