import Employee from "../lib/Employee.js";

test('creates an employee object', () => {
    const employee = new Employee('michael');

    expect(employee.name).toBe('michael');
    expect(employee.id).toEqual(expect.any(String));
    expect(employee.email).toEqual(expect.any(String));
    expect(employee.role).toEqual(expect.any(String));
});

test("gets employee's name as an object", () => {
    const employee = new Employee('michael');

    expect(employee.getName()).toEqual(expect.stringContaining(employee.name.toString()));
});

test("gets employee's id as an object", () => {
    const employee = new Employee('michael');

    expect(employee.getId()).toEqual(expect.stringContaining(employee.id.toString()));
});

test("gets employee's email as an object", () => {
    const employee = new Employee('michael');

    expect(employee.getEmail()).toEqual(expect.stringContaining(employee.email.toString()));
});

test("gets employee's role as an object", () => {
    const employee = new Employee('michael');

    expect(employee.getRole()).toEqual(expect.any(String));
});