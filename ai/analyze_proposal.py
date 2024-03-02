# This script evaluates proposals with this criteria:
# activity, impact (problem scale, neglectedness, proposal solvability)

import requests
from openai import OpenAI 
import os

# print(os.listdir('.'))
# os.chdir(r'\ai\')
# print(os.listdir('.'))


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
		model="gpt-3.5-turbo")
	evaluation = chat_completion.choices[0].message.content
	return evaluation
	
bad_sample_idea = "I want to solve the problem of world hunger by creating an instagram campaign to raise awareness."
results = evaluate(bad_sample_idea)
print(results)

# to do:
# include the piece of text being evaluated in inputs
# replace with other models found on huggingface