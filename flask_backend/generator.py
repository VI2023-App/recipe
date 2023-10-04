from callgpt import createChat
import glob
import pandas as pd
import json
import time
from tenacity import retry, stop_after_attempt, wait_fixed

from tenacity import before_log, after_log, before_sleep_log
import sys
import logging

logging.basicConfig(stream=sys.stderr, level=logging.INFO)
logger = logging.getLogger(__name__)


@retry(stop=stop_after_attempt(2), wait=wait_fixed(60), before_sleep=before_sleep_log(logger, logging.INFO))
def try_gpt_chat(text_prefix, text, conv_history=[]):
    res_text, res_agent, res_origin, token_count = createChat(message=f'{text_prefix} {text}', message_history=conv_history)
    time.sleep(1)
    return res_text