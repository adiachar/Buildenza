from playwright.sync_api import sync_playwright, expect

def test_signin_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the landing page first to verify the new Navbar
        page.goto("http://localhost:3000/")
        page.wait_for_load_state("networkidle")

        # Take a screenshot of the landing page to show the Buildenza name
        page.screenshot(path="verification/landing_page_buildenza.png", full_page=True)

        # Click the Sign In link in the Navbar
        sign_in_link = page.locator("a", has_text="Sign In")
        sign_in_link.click()

        # Wait for the sign in page to load
        page.wait_for_load_state("networkidle")

        # Verify the URL is correct
        expect(page).to_have_url("http://localhost:3000/auth/signin")

        # Take a screenshot of the Sign In page
        page.screenshot(path="verification/signin_page.png", full_page=True)

        # Click the Sign Up link
        sign_up_link = page.locator("a", has_text="start your free trial")
        sign_up_link.click()

        # Wait for the sign up page to load
        page.wait_for_load_state("networkidle")

        # Verify the URL is correct
        expect(page).to_have_url("http://localhost:3000/auth/signup")

        # Take a screenshot of the Sign Up page
        page.screenshot(path="verification/signup_page.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    test_signin_page()
