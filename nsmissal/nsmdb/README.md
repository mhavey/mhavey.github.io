# No-SQL Missal Database

## Intro

The No-SQL missal is a demo accompanying a blog post of mine. My blog is here:

- <https://mchavey.blogspot.com/2019/09/my-missal-is-my-bible-no-sql-data-model.html>

The demo shows how to represent the readings of a Roman Catholic mass in a No-SQL database. Using this data model, we can determine how many verses of the Bible are covered by these readings. As a bonus, the demo builds a calendar of masses. For more details, read the blog. 

If you want to actually standup your own NSM database, this is the folder for you! You will need the following:

- Gradle
- MarkLogic 9.x or 10.x. You'll need a live instance running.

Setting up the NSM database is optional. You don't actually need to setup a database. The reports, which contain the interesting findings, are here: <../data/reports>[../data/reports].

## Setting Up

First, edit gradle.properties. Change the host, username, and password for your enviroment. 

Next, initialize the NSM database and load its data

gradle -i mlDeploy loadData

Finally, run the reports:

gradle -i runReports

Look for errors. If the setup was successful, the reports should have a current timestamp and lots of rows.