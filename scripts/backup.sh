mongo --host kahana.mongohq.com --port 10071 -u github_user -p __temporarypassword__ --verbose --eval "db.submissions.remove({})" app29067833
mongo --host kahana.mongohq.com --port 10071 -u github_user -p __temporarypassword__ --verbose --eval "db.reset_password.remove({})" app29067833
mongoexport --host kahana.mongohq.com --port 10071 --db app29067833 -u github_user -p __temporarypassword__ --verbose -o final/accounts.json -c accounts
mongoexport --host kahana.mongohq.com --port 10071 --db app29067833 -u github_user -p __temporarypassword__ --verbose -o final/problems.json -c problems
mongoexport --host kahana.mongohq.com --port 10071 --db app29067833 -u github_user -p __temporarypassword__ --verbose -o final/shell_accounts.json -c shell_accounts
mongoexport --host kahana.mongohq.com --port 10071 --db app29067833 -u github_user -p __temporarypassword__ --verbose -o final/problems.json -c problems