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

    # Step 3: Enter Username
    print("Entering username: 'abctest'...")
    username_input = WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, 'identifier-field'))
    )
    username_input.send_keys('abctest')
    time.sleep(10)

    # Step 4: Click Continue after Username
    # Wait for the "Continue" button to be clickable and click it
    continue_button = WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.CLASS_NAME, 'cl-formButtonPrimary'))
    )
    continue_button.click()
    print("Clicked on Continue button after entering username.")
    time.sleep(10)

    # Step 5: Enter Password
    # Wait for the password input field to be present and interactable
    password_input = WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, 'password-field'))
    )

    # Enter the password
    password_input.send_keys('abc@1256')
    print("Password entered successfully!")

    time.sleep(10)

    # Step 6: Click Continue after Password
    # Wait for the "Continue" button to be clickable using the data-localization-key and click it
    continue_button = WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.XPATH, "//button[@data-localization-key='formButtonPrimary']"))
    )
    continue_button.click()
    print("Clicked on Continue button.")
    time.sleep(10)
    # Wait for the "Enter SPMS" link to be clickable using the href attribute and click it
    spms_link = WebDriverWait(driver, 15).until(
        EC.element_to_be_clickable((By.XPATH, "//a[@href='/documents']"))
    )
    spms_link.click()
    print("Clicked on 'Enter SPMS' link.")
    time.sleep(10)
    # Step 7: Verify Successful Login
    print("Login Successful! Test Case 1 Passed.")

except Exception as e:
    print(f" An error occurred: {e}")

finally:
    print("🛑 Closing WebDriver...")
    time.sleep(20)
    driver.quit()
