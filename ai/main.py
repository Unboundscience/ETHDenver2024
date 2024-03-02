from scrape_proposal import get_webpage_proposal
from analyze_proposal import query

target_url = '''https://manifund.org/projects/investigation-of-legionella-as-a-potential-cause-of-type-1-diabetes'''
llm_inputs = get_webpage_proposal(target_url)
scale_eval = query({"inputs":llm_inputs+" evaluate the impact of the proposal"})
