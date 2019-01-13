from .promo_scorer import score_promo
from img_recg.text_from_img import detect_text


def is_promo(promo):
    word_list = 'C:\\Users\\Leslie\\Documents\\hackaton\\BiteHack2019-hackathon\\scorer\\key_words.txt'
    text_score = score_promo(promo[1], word_list)
    print(promo[1])
    photo_score = 0
    if promo[2] != '#':
        text = detect_text(promo[2], True)
        photo_score = score_promo(text, word_list)

    if text_score + photo_score >=10:
        return True
    else:
        return False
