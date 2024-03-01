
# import requests # the requests library can retrieve the content of the microgrants website page
# from bs4 import BeautifulSoup # BeautifulSoup can parse the fetched HTML content and extract the information we need
import re # regular expression for filtering text
import selenium


# URL of the webpage being scraped
url = 'https://manifund.org/projects/investigation-of-legionella-as-a-potential-cause-of-type-1-diabetes'
proposal_main_text_class = '''ProseMirror px-3 text-sm prose leading-relaxed max-w-full prose-a:text-orange-600 prose-a:no-underline text-md prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-2 [&>p]:prose-li:my-0 text-gray-900 prose-blockquote:text-gray-600 prose-a:font-light prose-blockquote:font-light font-light break-anywhere empty:prose-p:after:content-[&quot;\00a0&quot;]'''

# Send a GET request to the webpage
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    print('request successful')

    # Parse the manifund page with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    # proposal main text
    all_paragraphs = soup.find_all('p')
    print(type(all_paragraphs))
    print('text located')
    print(len(all_paragraphs))

    # this loop is not working yet trying to figure it out 
    for paragraph in all_paragraphs:
        print(paragraph.type())
        print(paragraph.get_text())
        print('---')
else:
    print(f"Failed to retrieve the webpage: {response.status_code}")


# step 2: apply question answering models
# summarization models
    

# to do:
# change find to find_all to accommodate more text