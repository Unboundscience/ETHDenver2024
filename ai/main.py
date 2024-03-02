from scrape_proposal import get_webpage_proposal
from analyze_proposal import evaluate

target_url = 'https://manifund.org/projects/investigation-of-legionella-as-a-potential-cause-of-type-1-diabetes' # a sample proposal from manifund
llm_inputs = get_webpage_proposal(target_url)
ratings = evaluate(llm_inputs)
print(ratings)