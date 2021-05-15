from flask import Flask, request, abort

app = Flask(__name__)

# @app.before_request
# def white_list_ip():
#     if request.remote_addr != '<white list ip>':
#         abort(403)

@app.route('/')
def index():
    return 'hello'

@app.route('/scrap/<string:target>/<string:user>', methods=['GET'])
def scrap(target, user):
    
    avail_scrap_list = ['avail1', 'avail2']
    
    # if (request.headers.get('<header에 담기는 api token 등>') == None):
    #     abort(401)
    
    if (target in avail_scrap_list):
        return {
            "code": "200",
            "target": target,
            "user": user,
            "header": request.headers.get('')
        }
    
    else: 
        abort(404)

@app.errorhandler(401)
def fail_authentication(error):
    return {"code": "401"}

@app.errorhandler(403)
def forbiden(error):
    return {"code": "403"}

@app.errorhandler(404)
def page_not_found(error):
    return {"code": "404"}


if __name__ =='__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)