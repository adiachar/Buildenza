from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Check if the 500 error on /learn is gone
    page.goto("http://localhost:3000/api/auth/signin")

    # Fill login form
    page.fill('input[name="email"]', 'test@example.com')
    page.fill('input[name="password"]', 'password')
    page.click('button:has-text("Sign in with Credentials")')

    page.wait_for_timeout(3000)
    page.goto("http://localhost:3000/learn")
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/learn_logged_in.png")

    page.goto("http://localhost:3000/dashboard")
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/dashboard_logged_in.png")

    # close
    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
