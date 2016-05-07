from bottle import default_app, route
from bottle import Bottle, request, response, run
from gensim.models import Word2Vec

model = Word2Vec.load("MODELFOLDER")

@route('/synonyms/<word>', method='GET')
def recipe_show(word):
    if word:
        try:
            r =  model.most_similar(word)
            return {"response": r}
        except:
            return {"error": "word not found"}
    return {"error": "no word sent"}

application = default_app()
#application = Bottle()

@application.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
