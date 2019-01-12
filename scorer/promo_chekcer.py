from .promo_scorer import score_promo
from img_recg.text_from_img import detect_text


def is_promo(promo):
    word_list = 'key_words.txt'
    text_score = score_promo(promo[2], word_list)
    photo_score = 0
    if promo[3] != '#':
        text = detect_text(promo[3], True)
        photo_score = score_promo(text, word_list)

    if text_score + photo_score >=10:
        return True
    else:
        return False
