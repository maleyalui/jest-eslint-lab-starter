const { capitalizeWords, filterActiveUsers, logAction } = require('../index')
//Checks for normal cases
test(`Checks for normal cases`,()=>{
    expect(capitalizeWords("hello world")).toBe("Hello World")
});

//Checks for edge cases
test(`checks for egde cases`,()=>{
    expect(capitalizeWords("")).toBe("")
});

//For active Users
test(`Filter active users from a mixed array`,()=>{
    const users = [
        {name: "Alice",isActive: true},
        {name: "Bob",isActive: false},
        {name: "Ben",isActive: true}
    ];
    const result = filterActiveUsers(users);
    expect(result).toEqual([
        {name: "Alice",isActive: true},
        {name: "Ben",isActive: true}
    ]);
})
test(`Returns inactice users`,()=>{
    const users = [
        {name: "Alice",isActive: false},
        {name: "Bob",isActive: false}
    ];
    const result = filterActiveUsers(users);
    expect(result).toEqual([]);
});
test(`Returns an empty array`,()=>{
    const users = [];
    const result = filterActiveUsers(users)
    expect(result).toEqual([]);
});

//Checks for valid inputs

const result = logAction("login","User");
expect(result).toContain("User performed login");
expect(result).toContain("at");

test(`Generates the correct log string for valid inputs`,()=>{
    expect(logAction("Login","Luie")).toMatch(/^User Luie performed Login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
});
test(`Returns Invalid when action is empty string`,()=>{
    expect(logAction("","Luie")).toMatch(/^User Luie performed  at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
});
test(`Returns Invalid when username is empty string`,()=>{
    expect(logAction("Login","")).toMatch(/^User  performed Login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
});

test(`Returns invalid when username is undefined`,()=>{
    expect(logAction("Login",undefined)).toMatch(/^User undefined performed Login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
});
test(`Returns invalid when action is undefined`,()=>{
    expect(logAction(undefined,"Luie")).toMatch(/^User Luie performed undefined at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
});
