
def score_promo(text: str, scoring_words):
    file = open(scoring_words, "r")
    word_types = file.read().split('\n')
    score = 0
    for word_type in word_types:
        words = word_type.split('-')
        for word in words:
            if word in text.lower():

                score += 10
                break

    return score
