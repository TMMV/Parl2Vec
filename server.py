import gensim
from gensim import utils
from gensim.models import Word2Vec
#
model = Word2Vec.load("model")

from bottle import route, run

@route('/synonyms/<word>', method='GET')
def recipe_show(word):
    if word:
        return {"response": model.most_similar(word)}
    return {"error": "no word sent"}
    # return { "success" : False, "path" : "/PTH/TO/XML/"+name+".xml", "error" : "show not implemented yet" }

run(host='localhost', port=8080, debug=True)
