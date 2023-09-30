import json
import datetime

def make_prefix(db_data):
    date_now = datetime.datetime.now()

    prefix = f'あなたはこれから料理をします．{db_data}はあなたが所持している食材です．これから作れる料理のレシピを200文字以内で生成してください．なお，現在の日時は{date_now}です．'

    return prefix