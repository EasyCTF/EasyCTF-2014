# mongo --host kahana.mongohq.com --port 10071 -u github_user -p __temporarypassword__ --verbose --eval "db.shell_accounts.remove({})" app29067833
mongoimport --host kahana.mongohq.com --port 10071 --db app29067833 -u github_user -p __temporarypassword__ --verbose --file moar_accts.csv -c shell_accounts --type csv --headerline
