# DailySOS

[Live Website](https://dailysos.herokuapp.com)

Information overload is killing us, there is just too much content to read and there are only so many hours in a day.

Enter DailySOS, it brings you only the very important and useful links to your email daily. And control total number of links you get.

You can follow people and people can follow you.
Person can post links on their timeline, and followers get notified of new content.

The best feature is that you can assign a different score to people you follow, and their content would be scored based on that.

All links have a custom score based on your importance score of a person who shared it and links global popularity.

Depending on score it may or may not make it to the daily email. 

---
## Authors

Umer [Github](https://github.com/techsin)  
Kayla [Github](https://github.com/Kaylaf16)  
Liszt [Github](https://github.com/mouthwash)  
Vish [Github](https://github.com/vishivish01) 

## History

It started as a project for CUNY tech prep. Seems to have become actually useful tool as it was imagined and thus taken on another life of its own.

## Upcoming Features

-- to be done --

## Bugs to be Fixed

-- to be done --

## Notes

initdb /some/directory # just do this ONCE
pg_ctl -D /some/directory start # many other options, e.g. logging, available here
psql postgres
host all postgres 127.0.0.1/32 trust

pg_ctl -D \psql_data start
createdb -h localhost -U techsin dailysos


mac
psql -d dailysos


createuser -P -s -e techsin

createdb -h localhost -U techsin dailysos`