from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_new_content(page: Page):
    print("Navigating to home page...")
    page.goto("http://localhost:3000")

    # Wait for animation
    time.sleep(1)

    print("Taking screenshot of home page...")
    page.screenshot(path="verification/home_page_new_content.png", full_page=True)

    print("Navigating to Learn page...")
    page.goto("http://localhost:3000/learn")
    time.sleep(1)

    print("Taking screenshot of Learn page...")
    page.screenshot(path="verification/learn_page_new_content.png", full_page=True)

    print("Navigating to specific course page...")
    page.goto("http://localhost:3000/learn/construction-timelapse")
    time.sleep(1)

    print("Taking screenshot of Course page...")
    page.screenshot(path="verification/course_page_new_content.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 1500})
        page = context.new_page()
        try:
            verify_new_content(page)
            print("Verification script completed successfully.")
        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            browser.close()