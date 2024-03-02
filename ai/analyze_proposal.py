# This script evaluates proposals with this criteria:
# activity, impact (problem scale, neglectedness, proposal solvability)

import requests

api_url = "https://api-inference.huggingface.co/models/erfanzar/LinguaMatic"
api_token = "" # replace with token from settings in huggingface
headers = {"Authorization": f"Bearer {api_token}"} 

# send a query to model api and return the json response
def query(payload):
	response = requests.post(api_url, headers=headers, json=payload)
	return response.json()
	
#def evaluate_proposal():

output = query({
	"inputs": "please output the capital of France."})
print(len(output))
print(output)
# example call
# output = query({
# 	"inputs": "Evaluate the scale of the mentioned problem stated within the text, and give a rating from 1 - 10? ",
# })


# to do:
# include the piece of text being evaluated in inputs