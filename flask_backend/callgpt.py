import json
import settings
import openai

openai.api_key = settings.api_key


def createChat(message, message_history=[], max_tokens=800):
    """
    Parameters
    ----------
    message : str
        ユーザーからのメッセージ
    message_history : list
        ユーザーとエージェントのメッセージの履歴
        sample: [{"role": "user", "content": "Hello, World!"}, {"role": "agent", "content": "How are you?"}]
        
    Returns
    -------
    res_text : str
        エージェントからのメッセージ
    res_agent : str
        エージェントの役割
    res : dict
        エージェントからのメッセージのオブジェクト
    """    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=message_history
        + [
            {"role": "user", 
            "content": f"{message}"},
        ],
        temperature=0.7,
        max_tokens=max_tokens,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None,
    )
    res = response.choices[0].message
    res_text = response.choices[0].message.content
    res_agent = response.choices[0].message.role
    res_token_count = response.usage.prompt_tokens
    return res_text, res_agent, res, res_token_count
