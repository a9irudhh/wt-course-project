from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup WebDriver with Service
print("Initializing WebDriver...")
service = Service('/snap/bin/chromium.chromedriver')  # Verify this path exists
driver = webdriver.Chrome(service=service)

try:
    # Step 1: Open website
    print("Navigating to http://localhost:3000...")
    driver.get('http://localhost:3000')  # Replace with your actual URL
    time.sleep(10)  # Increased buffer for better observation

    # Step 2: Click Login Button
    print("Clicking on the Login button...")
    driver.find_element(By.XPATH, '/html/body/div[1]/div/div[2]/button[2]').click()
    time.sleep(10)

    # Step 3: Enter Username (wrong credentials)
    print("Entering username: 'arhanchinamani0909@gmail.com'...")
    username_input = WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, 'identifier-field'))
    )
    username_input.send_keys('arhanchinamani0909@gmail.com')
    time.sleep(10)

    # Step 4: Click Continue after Username
    print("Clicked on Continue button after entering wrong username.")
    continue_button = WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.CLASS_NAME, 'cl-formButtonPrimary'))
    )
    continue_button.click()
    time.sleep(10)

    # Step 5: Enter Password (wrong password)
    print("Entering password: 'wrongpassword'...")
    password_input = WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, 'password-field'))
    )
    password_input.send_keys('wrongpassword')
    time.sleep(10)

    # Step 6: Click Continue after Password
    continue_button = WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.XPATH, "//button[@data-localization-key='formButtonPrimary']"))
    )
    continue_button.click()
    time.sleep(10)

    # Step 7: Handle the failure scenario (Error message, invalid credentials, etc.)
    try:
        # Check if there's an error message indicating failed login
        error_message = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(text(),'Invalid credentials')]"))
        )
        print("❌ Login Failed: Invalid credentials!")
    except:
        print("Unexpected behavior: No error message found.")

    # Step 8: Verify URL if it contains 'documents'
    current_url = driver.current_url
    if 'documents' in current_url:
        print("❌ Login Success: Redirected to documents page, test failed.")
    else:
        print("✔️ Correct behavior: Login failed, as expected!")

except Exception as e:
    print(f"An error occurred\nTest Case Login Failed!")

finally:
    print("🛑 Closing WebDriver...")
    time.sleep(20)
    driver.quit()
