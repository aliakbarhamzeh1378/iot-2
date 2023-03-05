const assert = require("assert");
const { AuthService } = require("../src/services/authService");

describe("authentication", function () {
  it("true if email and password be true", async () => {
    const email = "MARYAM234@yahoo.com";
    const password = "rozhan_rozhin";
    assert.equal(await AuthService.loginCheck(email, password), 200);
  });

  it("false if email be true and password be false", async () => {
    const email = "MARYAM234@yahoo.com";
    const password = "rozhan";
    assert.equal(
      await AuthService.loginCheck(email, password),
      "password is wrong"
    );
  });

  it("false if email be false and password be true", async () => {
    const email = "MARYA4@yahoo.com";
    const password = "rozhan_rozhin";
    assert.equal(
      await AuthService.loginCheck(email, password),
      "your email is wrong"
    );
  });

  it("false if email be false and password be false", async () => {
    const email = "MARYA4@yahoo.com";
    const password = "rn_rozhin";
    assert.equal(
      await AuthService.loginCheck(email, password),
      "email and password is wrong"
    );
  });
});
