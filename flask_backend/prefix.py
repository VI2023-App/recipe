import json
import datetime

def make_prefix(data):
    date_now = datetime.datetime.now()

    prefix = f'あなたはこれから料理をします．{data}はあなたが所持している食材です．これから作れる料理のレシピを150文字以内で箇条書きでステップごとに生成してください．なお，現在の日時は{date_now}です．'

    return prefix