# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo\login.spec.ts >> Login Tests >> should show error with locked out credentials
- Location: tests\saucedemo\login.spec.ts:16:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('heading', { level: 3 })
Expected substring: "locked out"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByRole('heading', { level: 3 })

```

```yaml
- text: Swag Labs
- main:
  - form "Login":
    - textbox "Username": locked_out_user
    - textbox "Password": secret_sauce
    - alert:
      - button "Dismiss error"
      - text: "Epic sadface: Sorry, this user has been locked out."
    - button "Login"
  - heading "Accepted usernames are:" [level=4]
  - text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
  - heading "Password for all users:" [level=4]
  - text: secret_sauce
```

# Test source

```ts
  1  | import {test,expect} from '../../fixtures/appFixtures';
  2  | 
  3  | test.describe('Login Tests', () => {
  4  | 
  5  |     test('should login with valid credentials', {
  6  |     tag: ['@smoke', '@validlogin'],
  7  |   },async ({ loginPage,productPage }) => {
  8  |     
  9  |         await loginPage.navigateTo(); // Navigate to the login pageFactory
  10 |         await loginPage.loginAs('STANDARD_USER');
  11 |         await expect(productPage.isProductPageLoaded()).toBeTruthy();
  12 |         //logout from the application
  13 |         await productPage.logout();
  14 |     });
  15 | 
  16 |     test('should show error with locked out credentials',{
  17 |     tag: ['@regression', '@lockedout'],
  18 |   }, async ({ loginPage }) => {
  19 |         await loginPage.navigateTo();
  20 |        await loginPage.loginAs('LOCKED_OUT_USER');
> 21 |       await expect(loginPage.getErrorMessage()).toContainText('locked out');
     |                                                 ^ Error: expect(locator).toContainText(expected) failed
  22 |     }); 
  23 | 
  24 |     test('should show error with invalid credentials', {
  25 |     tag: ['@sanity', '@invalidlogin'],
  26 |   },async ({ loginPage }) => {
  27 |          await loginPage.navigateTo();
  28 |         await loginPage.loginAs('INVALID_USER');
  29 |         await expect(loginPage.getErrorMessage()).toContainText('Username and password do not match');
  30 |     });
  31 | });  
```