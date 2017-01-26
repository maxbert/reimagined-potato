from flask import Flask, render_template, request, url_for, session, redirect
import hashlib, sqlite3, json, os
from utils import auth
from utils import savefile
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/images'


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
        status=""
        if "status" in request.args:
            status = request.args.get("status")
        return render_template("homepage.html",status=status)

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

@app.route("/removemypages/")
def removemypages():
    if "user" not in session:
        return redirect(url_for("login"))
    mypages_str=savefile.getremovepages(session["user"],"edit",True)
    return render_template("removemypages.html", mypages_html=mypages_str)

@app.route("/remove/", methods = ['POST'])
def remove():
    res = request.json
    filename = str(res['filename'])
    username = session["user"]
    savefile.remove(username, filename)
    return "success"

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
    if request.form["site_name"] == "":
        return redirect(url_for("home",status="Please Enter a Site Name"))
    if savefile.checkSites(session["user"],request.form["site_name"]):
        return redirect(url_for("home",status="Site Name Already In Use"))
    f=open("templates/template1/%s.html"%(request.form["template"]),'r')
    templatehtml = f.read()
    site_name = request.form["site_name"].replace(" ","_")
    savefile.save(session["user"],site_name, templatehtml)
    return redirect(url_for("edit_site",username=session["user"],site_name=site_name))

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
    html_edit = str(res['edit_html'])
    html_publish = str(res['publish_html'])
    html_title = str(res['title'])
    savefile.publish(session["user"], html_title, html_publish)
    savefile.save(session["user"], html_title, html_edit)
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

@app.route("/<username>/publish/<site_name>")
def hosted_site(username, site_name):
    temp_url = "%s/publish/%s.html"%(username,site_name)
    return render_template(temp_url)

@app.route("/viewotherpages/")
def viewotherpages():
    if "user" not in session:
        return redirect(url_for("login"))
    print savefile.getOtherPages()
    mypages_str=savefile.getOtherPages()
    print mypages_str
    return render_template("viewotherpages.html", mypages_html=mypages_str)

@app.route("/s/", methods=["POST"])
def upload_file():
    file = request.files['photo']
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    return json.dumps({"success":True})

if __name__ == "__main__":
    app.debug = True
    app.run()

