from flask import Flask, render_template, request, url_for, session, redirect
import hashlib, sqlite3, json, requests
import os
db1 = "data/database.db"

def db_addpath(user,filepath):
    db = sqlite3.connect(db1)
    c = db.cursor()
    query = "SELECT * FROM users"
    dbPages = c.execute(query)
    for entry in dbPages:
        if (entry[0] == user):
            pages = entry[2]
            break
    pagesArr = pages.split(",")
    for entry in pagesArr:
        if (entry == filepath):
            return "AlreadyIN"
    updatedsites = pages + filepath + ","
    updateQuery = "UPDATE users SET sites = \'%s\' WHERE user = \'%s\'"%(updatedsites,user)
    c.execute(updateQuery)
    print updatedsites
    db.commit()
    db.close()


def save(user,site_name,html):
    actual_html = "<!DOCTYPE html>\n<html>\n" + html + "\n</html>"
    dirname = "templates/" + user
    filepathname = "templates/" + "%s/edit/%s.html"%(user,site_name)
    if os.path.exists(dirname):
        f = open(filepathname, 'w+')
        f.write(actual_html)
    else:
        os.mkdir(dirname)
        editdirname = dirname + "/edit"
        os.mkdir(editdirname)
        publishdirname = dirname + "/publish"
        os.mkdir(publishdirname)
        f = open(filepathname, 'w+')
        f.write(actual_html)
    filepath = "/edit/%s"%(site_name)
    db_addpath(user,filepath)
    return "xd"


def publish(user,site_name,html):
    actual_html = "<!DOCTYPE html>\n<html>\n" + html + "\n</html>"
    dirname = "templates/" + user
    filepathname = "templates/" + "%s/publish/%s.html"%(user,site_name)
    if os.path.exists(dirname):
        f = open(filepathname, 'w+')
        f.write(actual_html)
    else:
        os.mkdir(dirname)
        editdirname = dirname + "/edit"
        os.mkdir(editdirname)
        publishdirname = dirname + "/publish"
        os.mkdir(publishdirname)
        f = open(filepathname, 'w+')
        f.write(actual_html)
    filepath = "/publish/%s"%(site_name)
    db_addpath(user,filepath)
    return "xd"


def getpages(username,editpublish,withLinks):
    db = sqlite3.connect(db1)
    c = db.cursor()
    query = "SELECT * FROM users"
    dbPages = c.execute(query)
    for entry in dbPages:
        if (entry[0] == username):
            pages = entry[2]
            break
    if pages == "":
        return "You currently have no sites."

    mypages_str=""
    pagesArr2 = []  #copy pages that match editpublish argument into pagesArr2
    pagesArr = pages.split(",")
    for entry in pagesArr:
        dir = entry.split("/")
        if (len(dir)>2 and dir[1] == editpublish):
            pagesArr2.append(entry)

    if (withLinks):
        mypages_count=0
        for entry in pagesArr2:
            mypages_str+= "<a href=../%s%s> %s </a><br>"%(username,entry, entry.split("/")[2])
        mypages_count+=1
        
    if (mypages_count == 0):
        mypages_str+= "You currently have no sites."
    return mypages_str
        
def getOtherPagesHelper(username,editpublish,withLinks):
    db = sqlite3.connect(db1)
    c = db.cursor()
    query = "SELECT * FROM users"
    dbPages = c.execute(query)
    for entry in dbPages:
        if (entry[0] == username):
            pages = entry[2]
            break
    if pages == "":
        return "You currently have no sites."

    mypages_str=""
    pagesArr2 = []  #copy pages that match editpublish argument into pagesArr2
    pagesArr = pages.split(",")
    for entry in pagesArr:
        dir = entry.split("/")
        if (len(dir)>2 and dir[1] == editpublish):
            pagesArr2.append(entry)
    if (withLinks):
        mypages_count=0
        for entry in pagesArr2:
            mypages_str+= '<a class="btn btn-success" href=../%s%s> %s </a><br><br>'%(username,entry, username + "/" + entry.split("/")[2])
        mypages_count+=1        
    if (mypages_count == 0):
        mypages_str+= "You currently have no sites."
    return mypages_str
        
def getOtherPages():
    retstr = ""
    db = sqlite3.connect(db1)
    c = db.cursor()
    query = "SELECT * FROM users"
    dbPages = c.execute(query)
    for entry in dbPages:
        name = entry[0]
        if getOtherPagesHelper(name, "publish", True) != "You currently have no sites.":
            retstr += getOtherPagesHelper(name, "publish", True)
    return retstr
