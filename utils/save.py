from flask import Flask, render_template, request, url_for, session, redirect
import hashlib, sqlite3, json, requests

db = "../data/database.db"

#saves edditing page as editting html
#use javascript(?) to remove the editting stuff and save as design page
#def save():
# 

#??
def publish(user,site_name,html):
	filepathname = "../templates/%s/%s.html"%(user,site_name)
	with open(filepathname,"rw+") as f:
			f.write(html) 
