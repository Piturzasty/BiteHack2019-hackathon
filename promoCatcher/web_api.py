import urllib.request
from bs4 import BeautifulSoup

#https://www.instagram.com/kogel_mogel_krakow/
#http://www.pizzeriamatteo.pl/promocje.html
# https://pizzahut.pl/#ChooseDelivery

fp = urllib.request.urlopen("http://nowojorska.pizza/promocje")
mybytes = fp.read()

mystr = mybytes.decode("utf8")
fp.close()

soup = BeautifulSoup(mystr, features="html.parser")

for imgtag in soup.find_all('img'):
    print(imgtag['src'])


# # text:
#
# # kill all script and style elements
# for script in soup(["script", "style"]):
#     script.extract()    # rip it out
#
# # get text
# text = soup.get_text()
#
# # break into lines and remove leading and trailing space on each
# lines = (line.strip() for line in text.splitlines())
#
# chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
# # drop blank lines
# text = '\n'.join(chunk for chunk in lines if chunk)
#
# print(text)