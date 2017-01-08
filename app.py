from flask import Flask, render_template, request, url_for, session, redirect
import hashlib, sqlite3, json, requests
from utils import auth


f = "data/database.db"


app = Flask(__name__)
app.secret_key = '<j\x9ch\x80+\x0b\xd2\xb6\n\xf7\x9dj\xb8\x0fmrO\xce\xcd\x19\xd49\xe5S\x1f^\x8d\xb8"\x89Z'


@app.route("/")
@app.route("/home/", methods = ["GET","POST"])
def home():
    if 'user' not in session:
        return redirect(url_for("login"))
    else:
        return render_template("homepage.html")

@app.route("/login/", methods = ["GET","POST"])
def login():
    if "user" in session:
        return redirect(url_for("home"))
    if request.method == "GET":
        return render_template("login.html", status = "")
    if request.form["enter"] == "Register":
        register_message = auth.register(request.form["users"],request.form["pass"])
        return render_template("login.html", status = register_message)
    if request.form["enter"] == "Login":
        login_message = auth.checkLogin(request.form["users"],request.form["pass"])
        if (login_message == ""):
            session["user"] = request.form["users"]
            return redirect(url_for("home"))

    return render_template("login.html", status = login_message)

@app.route("/accountsettings/", methods = ["POST", "GET"])
def accountsettings():
    if "user" not in session:
        return redirect(url_for("login"))
    if request.method =="GET":
        return render_template("accountSettings.html")
    else: pass_message = auth.changePass(session["users"],request.form["oldpass"],request.form["newpass"])
    return render_template("accountSettings.html", status = pass_message)

@app.route("/logout/")
def logout():
    if "user" in session: session.pop("user")
    if "coords" in session: session.pop("coords")
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.debug = True
    app.run()
