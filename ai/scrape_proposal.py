# This script gets a sample proposal analysis
# It webscrapes from manifund, a microgrants website

# imports
from selenium import webdriver # tool in Selenium that allows you to control general web browsers programmatically
from selenium.webdriver.chrome.service import Service # the Service component is used to manage the lifecycle of the browser driver service. It starts and stops the service
from selenium.webdriver.common.by import By # The By class is used to locate elements on a web page. It provides various methods to identify elements based on different attributes like ID, class name, tag name, etc
from selenium.webdriver.chrome.options import Options # Options refer to configuration settings that can be applied to the specific browser driver. For example, ChromeOptions allow you to set preferences for ChromeDriver, such as window size, headless mode, or proxy settings
from webdriver_manager.chrome import ChromeDriverManager # automates te management of ChromeDriver in Selenium
import time
import requests


def get_webpage_proposal(proposal_url):
    '''currently supports scraping a single webpage of a given proposal'''

    # Setup Selenium WebDriver
    options = Options() # create instance of options
    options.headless = False  # Change to False if you want to see the browser window
    service = Service(ChromeDriverManager().install()) # create service
    driver = webdriver.Chrome(service=service, options=options) # Create an instance of the Chrome WebDriver with the specified service and options.

    # Open the page
    driver.get(proposal_url)
    print('page opened, waiting to load')

    # Wait 10 sec for the dynamic content to load
    time.sleep(10) 

    # this contains the proposal and comment text
    # in manifund, the proposal text is found within a class that has ".ProseMirror" in its name
    elements = driver.find_elements(By.CSS_SELECTOR, ".ProseMirror")
    proposal_text = ''

    # Extract and print the text from each found element
    for element in elements:
        proposal_text += element.text
        #print(element.text)
        
    print(proposal_text)
    #print(len(proposal_text), len(element.text)) 
    return proposal_text

    # Close the browser window
    driver.quit()
