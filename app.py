from flask import Flask, render_template, request, url_for, session, redirect
import hashlib, sqlite3, json
from utils import auth
from utils import savefile


db = "data/database.db"


app = Flask(__name__)
app.secret_key = '<j\x9ch\x80+\x0b\xd2\xb6\n\xf7\x9dj\xb8\x0fmrO\xce\xcd\x19\xd49\xe5S\x1f^\x8d\xb8"\x89Z'

test_html_string = ""
@app.route("/")
@app.route("/home/", methods = ["GET","POST"])
def home():
    if 'user' not in session:
        return redirect(url_for("login"))
    else:
        f = open("templates/template1/template1.html", 'r')
        templatehtml = f.read()
        f.close()
        return render_template("homepage.html", template1 = templatehtml)

@app.route("/login/", methods = ["GET","POST"])
def login():
    if "user" in session:
        return redirect(url_for("home"))
    if request.method == "GET":
        return render_template("login.html", status = "")
    if request.form["enter"] == "Register":
        register_message = auth.register(request.form["user"],request.form["pass"])
        return render_template("login.html", status = register_message)
    if request.form["enter"] == "Login":
        login_message = auth.checkLogin(request.form["user"],request.form["pass"])
        if (login_message == ""):
            session["user"] = request.form["user"]
            return redirect(url_for("home"))

    return render_template("login.html", status = login_message)

@app.route("/accountsettings/", methods = ["POST", "GET"])
def accountsettings():
    if "user" not in session:
        return redirect(url_for("login"))
    if request.method =="GET":
        return render_template("accountSettings.html")
    else: pass_message = auth.changePass(session["user"],request.form["oldpass"],request.form["newpass"])
    return render_template("accountSettings.html", status = pass_message)

@app.route("/logout/")
def logout():
    if "user" in session: session.pop("user")
    return redirect(url_for("home"))

@app.route("/editmypages/")
def editmypages():
    if "user" not in session:
        return redirect(url_for("login"))
    mypages_str=savefile.getpages(session["user"],"edit",True)
    return render_template("editmypages.html", mypages_html=mypages_str)

@app.route("/viewmypages/")
def viewmypages():
    if "user" not in session:
        return redirect(url_for("login"))
    mypages_str=savefile.getpages(session["user"],"publish",True)
    return render_template("viewmypages.html", mypages_html=mypages_str)

@app.route("/templateselector/", methods = ['POST'])
def templateselector():
    if "user" not in session:
        return redirect(url_for("login"))
    f=open("templates/template1/%s.html"%(request.form["template"]),'r')
    templatehtml = f.read()
    savefile.save(session["user"],request.form["site_name"], templatehtml)
    site_name1=request.form["site_name"]
    return redirect(url_for("edit_site",username=session["user"],site_name=site_name1))

@app.route("/save/", methods = ['POST'])
def save():
    res = request.json
    html_extract = str(res['templatehtml'])
    html_title = str(res['title'])
    savefile.save(session["user"], html_title, html_extract)
    return "success"

@app.route("/publish/", methods = ['POST'])
def publish():
    res = request.json
    html_extract = str(res['templatehtml'])
    html_title = str(res['title'])
    savefile.publish(session["user"], html_title, html_extract)
    return "success"

@app.route("/<template>/")
def design(template):
    temp_url = template + '/' + template + '.html'
    return render_template(temp_url)

@app.route("/<username>/edit/<site_name>")
def edit_site(username, site_name):
    if "user" not in session:
        return redirect(url_for("login"))
    if session["user"] != username:
        return redirect(url_for("homepage"))
    temp_url = "%s/edit/%s.html"%(username,site_name)
    return render_template(temp_url,sitetitle=site_name)

@app.route("/<username>/<site_name>")
def hosted_site(username, site_name):
    temp_url = username + '/' + site_name + '.html'
    return render_template(temp_url)

if __name__ == "__main__":
    app.debug = True
    app.run()

