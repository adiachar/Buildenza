from playwright.sync_api import sync_playwright, expect
import time

def verify_premium_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Step 1: Sign up a new user so we can test the dashboard cards
        print("Navigating to signup...")
        page.goto("http://localhost:3001/auth/signup")

        # Using timestamp to ensure unique email
        test_email = f"test_{int(time.time())}@example.com"

        page.get_by_placeholder("Full Name").fill("Test User")
        page.get_by_placeholder("Email address").fill(test_email)
        page.get_by_placeholder("Password").fill("password123")

        print("Submitting signup form...")
        page.get_by_role("button", name="Sign Up", exact=True).click()

        # Should redirect to dashboard automatically
        print("Waiting for dashboard redirect...")
        expect(page).to_have_url("http://localhost:3001/dashboard", timeout=10000)

        # Take screenshot of the initial dashboard with cards
        print("Taking screenshot of free dashboard...")
        expect(page.locator("text=Unlock Premium Access")).to_be_visible()
        page.screenshot(path="verification/dashboard_free.png", full_page=True)

        # Click "Fake Buy" for the monthly plan
        print("Clicking Fake Buy...")
        page.once("dialog", lambda dialog: dialog.accept()) # Accept the alert
        page.get_by_role("button", name="Fake Buy for $5").click()

        # Wait for the page to refresh and show premium status
        print("Waiting for premium status...")
        expect(page.locator("text=🎉 You are a Premium Member")).to_be_visible(timeout=10000)

        # Take screenshot of the premium dashboard
        print("Taking screenshot of premium dashboard...")
        page.screenshot(path="verification/dashboard_premium.png", full_page=True)

        # Test auth error flow while we're here
        print("Navigating to signin for error testing...")
        page.goto("http://localhost:3001/api/auth/signout") # Clear session
        page.goto("http://localhost:3001/auth/signin")
        page.get_by_placeholder("Email address").fill("wrong@example.com")
        page.get_by_placeholder("Password").fill("wrongpassword")
        page.get_by_role("button", name="Sign In", exact=True).click()
        expect(page.locator("text=Invalid email or password.")).to_be_visible()
        page.screenshot(path="verification/signin_error.png", full_page=True)

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_premium_flow()
