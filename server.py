import gensim
from gensim import utils
from gensim.models import Word2Vec
#
model = Word2Vec.load("model")

from bottle import route, run

@route('/synonyms/<word>', method='GET')
def recipe_show(word):
    if word:
        try:
            r =  model.most_similar(word)
            return {"response": r}
        except:
            return {"error": "word not found"}
    return {"error": "no word sent"}

run(host='localhost', port=8080, debug=True)
