# This script evaluates proposals with this criteria:
# activity, impact (problem scale, neglectedness, proposal solvability)

# imports
from selenium import webdriver # tool in Selenium that allows you to control general web browsers programmatically
from selenium.webdriver.chrome.service import Service # the Service component is used to manage the lifecycle of the browser driver service. It starts and stops the service
from selenium.webdriver.common.by import By # The By class is used to locate elements on a web page. It provides various methods to identify elements based on different attributes like ID, class name, tag name, etc
from selenium.webdriver.chrome.options import Options # Options refer to configuration settings that can be applied to the specific browser driver. For example, ChromeOptions allow you to set preferences for ChromeDriver, such as window size, headless mode, or proxy settings
from webdriver_manager.chrome import ChromeDriverManager # automates te management of ChromeDriver in Selenium
import time

# Step 1: get sample text for analysis
# webscraping from manifund, a microgrants website

# Setup Selenium WebDriver
options = Options() # create instance of options
options.headless = False  # Change to False if you want to see the browser window
service = Service(ChromeDriverManager().install()) # create service
driver = webdriver.Chrome(service=service, options=options) # Create an instance of the Chrome WebDriver with the specified service and options.

# Target URL
url = '''https://manifund.org/projects/investigation-of-legionella-as-a-potential-cause-of-type-1-diabetes'''

# Open the page
driver.get(url)
print('page opened, waiting to load')

# Wait 7 sec for the dynamic content to load
time.sleep(7) 

# Find elements by a unique substring within the class name
# this contains the proposal and comment text
elements = driver.find_elements(By.CSS_SELECTOR, ".ProseMirror")

# Extract and print the text from each found element
for element in elements:
    print(element.text)



# Clean up: close the browser window
driver.quit()
