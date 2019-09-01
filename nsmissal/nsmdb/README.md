# No-SQL Missal Database

## Intro

The No-SQL missal is a demo accompanying a blog post of mine. My blog is here:

- <https://mchavey.blogspot.com/>

The demo shows how to represent the readings of a Roman Catholic mass in a No-SQL database. Using this data model, we can determine how many verses of the Bible are covered by these readings. As a bonus, the demo builds a calendar of masses. For more details, read the blog. 

If you want to actually standup your own NSM database, this is the folder for you! You will need the following:

- Gradle
- MarkLogic 9.x. You'll need a live instance.

Setting up the NSM database is optional. You don't actually need to setup a database. The reports, which contain the interesting findings, are here: <TODO>.

## Setting Up

First, edit gradle.properties. Change the host, username, and password for your enviroment. 

Next, initialize the NSM database and load its data

gradle -i mlDeploy loadData

Finally, run the reports:

gradle -i runReports

