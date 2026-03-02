from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Capture landing page
    page.goto("http://localhost:3000/")
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/landing_page.png", full_page=True)

    # close
    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
