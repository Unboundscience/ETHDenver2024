# This script evaluates proposals with this criteria:
# activity, impact (problem scale, neglectedness, proposal solvability)

import requests
from openai import OpenAI 
import os

with open('prompt.txt', 'r') as file:
	prompt_text = file.read()

client = OpenAI(
	api_key = ''
    #api_key=os.environ.get("OPENAI_API_KEY"),
)


def evaluate(input_text):
	chat_completion = client.chat.completions.create(
		messages=[
			{
				"role": "user",
				"content": prompt_text+input_text,
			}
		],
		model="gpt-3.5-turbo",
	)
bad_sample_idea = "I want to solve the problem of world hunger by creating an instagram campaign to raise awareness."
results = evaluate(bad_sample_idea)
print(results)
# api_url = "https://api-inference.huggingface.co/models/erfanzar/LinguaMatic"
# api_token = "" # replace with token from settings in huggingface
# headers = {"Authorization": f"Bearer {api_token}"} 

# # send a query to model api and return the json response
# def query(payload):
# 	response = requests.post(api_url, headers=headers, json=payload)
# 	return response.json()
	
# #def evaluate_proposal():

# output = query({
# 	"inputs": "please output the capital of France."})
# print(len(output))
# print(output)



# to do:
# include the piece of text being evaluated in inputs
# replace with other models found on huggingface