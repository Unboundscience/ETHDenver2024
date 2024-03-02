# This script evaluates proposals with this criteria:
# problem scale, problem neglectedness, proposal tractability, current proposal activeness)

import requests
from openai import OpenAI 
import os

#print(os.listdir('.'))
os.chdir('ai')
#print(os.listdir('.'))


with open('prompt.txt', 'r') as file:
 	prompt_text = file.read()

client = OpenAI(
	api_key = '' # make sure to replace it with your openAI API key
    #api_key=os.environ.get("OPENAI_API_KEY")
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

# to-do:
# use other question-answering models found on huggingface