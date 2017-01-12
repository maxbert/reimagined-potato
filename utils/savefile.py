from flask import Flask, render_template, request, url_for, session, redirect
import hashlib, sqlite3, json, requests
import os
db = "../data/database.db"

#saves
#use javascript(?) to remove the editting stuff and save as design page

def publish(user,site_name,html):
    actual_html = "<!DOCTYPE html>\n<html>\n" + html + "\n</html>"
    dirname = "templates/" + user
    filepathname = "templates/" + "%s/%s.html"%(user,site_name)
    if os.path.exists(dirname):
        f = open(filepathname, 'w+')
        f.write(actual_html)
    else:
        os.mkdir(dirname)
        f = open(filepathname, 'w+')
        f.write(actual_html)
    return "xd"
