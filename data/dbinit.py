import hashlib,sqlite3

f="database.db"

db = sqlite3.connect(f) #open if f exists, otherwise create
c = db.cursor()    #facilitate db ops

q = "CREATE TABLE users (user TEXT, pass TEXT, site TEXT, site_edit TEXT)"
c.execute(q)

q = "INSERT INTO users VALUES(\'michael\', \'%s\',\'site\',\'site_edit\')"%(hashlib.sha1("michael").hexdigest())
c.execute(q)

db.commit() #save changes
db.close()  #close database
