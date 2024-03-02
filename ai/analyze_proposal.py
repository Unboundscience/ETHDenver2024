# This script evaluates proposals with this criteria:
# activity, impact (problem scale, neglectedness, proposal solvability)

import requests
import openai 
import os
openai.api_key = '' # insert key
#os.getenv('OPENAI_API_KEY')

def evaluate(input_text):
	response = openai.ChatCompletion.create(
	model="gpt-3.5-turbo",
	messages=[
        {"role": "system", "content": "You are an experienced assistant at evaluating grants. You worked at 80000 hours and top VCs."},
        {"role": "user", "content": f"Given the following proposal, please evaluate it on 4 metrics: Proposal activeness, problem scale, problem neglectedness, and proposal tractability using the 80000 hours framework. {input_text} Output 4 natural numbers from 1 - 10 (with 10 being best) for each metric."}
        ])
	return response.choices[0]
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