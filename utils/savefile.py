from flask import Flask, render_template, request, url_for, session, redirect
import hashlib, sqlite3, json, requests
import os
db1 = "data/database.db"

#saves
#use javascript(?) to remove the editting stuff and save as design page

def save(user,site_name,html):
    actual_html = "<!DOCTYPE html>\n<html>\n" + html + "\n</html>"
    dirname = "templates/" + user + "/edit"
    filepathname = "templates/" + "%s/edit/%s.html"%(user,site_name)
    if os.path.exists(dirname):
        f = open(filepathname, 'w+')
        f.write(actual_html)
    else:
        os.mkdir(dirname)
        f = open(filepathname, 'w+')
        f.write(actual_html)
    return "xd"


def publish(user,site_name,html):
    actual_html = "<!DOCTYPE html>\n<html>\n" + html + "\n</html>"
    dirname = "templates/" + user + "/final"
    filepathname = "templates/" + "%s/final/%s.html"%(user,site_name)
    if os.path.exists(dirname):
        f = open(filepathname, 'w+')
        f.write(actual_html)
    else:
        os.mkdir(dirname)
        f = open(filepathname, 'w+')
        f.write(actual_html)
    return "xd"


def getpages(username,editpublish):
    db = sqlite3.connect(db1)
    c = db.cursor()
    query = "SELECT * FROM users"
    dbPages = c.execute(query)
    for entry in dbPages:
        if (entry[0] == username):
            pages = entry[2]
            break
    print pages
    if pages == "":
        return "You currently have no sites."

    mypages_str=""
    pagesArr2 = []  #copy pages that match editpublish argument into pagesArr2
    pagesArr = pages.split(",")
    print pagesArr
    for entry in pagesArr:
        dir = entry.split("/")
        print dir
        if (dir[1] == editpublish):
            pagesArr2.append(entry)

    mypages_count=0
    for entry in pagesArr2:
        mypages_str+= "<a href=%s> %s </a><br>"%(entry, entry.split("/")[2])
        mypages_count+=1
    if (mypages_count == 0): mypages_str+= "You currently have no sites."
    return mypages_str








