-- QUESTION 1.
-- The two last. 
-- facid is foreign key to facilities
--memid is a foreign key to members

--Question 2. 
-- many to many
-- bookings

--Question 3.
-- its a self referencing realationship


--Skill 3:

-- 1.  
SELECT bks.starttime
FROM cd.bookings bks
JOIN cd.members mems 
ON
mems.memid = bks.memid
WHERE mems.firstname= 'David' AND mems.surname = 'Farrell';
-- 2. 
SELECT
bks.starttime, facs.name
FROM cd.bookings bks
JOIN cd.facilities facs ON bks.facid = facs.facid
WHERE facs.name IN ('Tennis Court 1', 'Tennis Court 2')
AND bks.starttime >= '2012-09-21' 
AND bks.starttime <'2012-09-22'
ORDER BY bks.starttime;

--3.
SELECT DISTINCT
mems.firstname,
mems.surname
FROM cd.members mems
INNER JOIN cd.members recs ON mems.memid = recs.recommendedby
ORDER BY mems.surname, mems.firstname;

--4.
SELECT mems.firstname 
AS memfname, mems.surname 
AS memsname, 
recs.firstname 
AS recfname,recs.surname AS
recsname

FROM cd.members mems LEFT OUTER JOIN cd.members recs
ON mems.recommendedby = recs.memid
ORDER BY mems .surname, mems.firstname;

--5.
SELECT DISTINCT mems.firstname ||' ' || mems.surname AS member, facs.name AS facility
FROM 
cd.members mems 
inner JOIN cd.bookings bks 
 ON mems.memid = bks.memid
 
 inner JOIN cd.facilities facs
 ON bks. facid = facs.facid
 
 
WHERE facs.name IN ('Tennis Court 1', 'Tennis Court 2')
ORDER BY member , facility;

--6.
SELECT mems.firstname || ' ' || mems.surname AS member,
facs.name AS facility, 
CASE WHEN mems.memid = 0
THEN bks.slots * facs.guestcost
ELSE 
bks.slots * facs.membercost
END AS cost

FROM cd.members mems
INNER JOIN cd.bookings bks
ON mems.memid = bks.memid

INNER JOIN cd.facilities facs
ON bks.facid = facs.facid

WHERE bks. starttime >= '2012-09-14'
AND bks. starttime < '2012-09-15'

AND CASE
WHEN mems.memid = 0
THEN
bks.slots *
facs.guestcost
ELSE
bks.slots * 
facs.membercost
END >30

ORDER BY cost DESC;

--7.
select distinct 
mems.firstname || ' ' ||  mems.surname as member,
(select recs.firstname || ' ' || recs.surname as recommender 
from cd.members recs 
where recs.memid = mems.recommendedby
)
from 
cd.members mems
order by member; 

--8.
SELECT * FROM (
  SELECT
  mems.firstname || ' ' || mems.surname AS member,
facs.name AS facility, 
CASE WHEN mems.memid = 0
THEN bks.slots * facs.guestcost
ELSE 
bks.slots * facs.membercost
END AS cost

FROM cd.members mems
INNER JOIN cd.bookings bks
ON mems.memid = bks.memid

INNER JOIN cd.facilities facs
ON bks.facid = facs.facid

WHERE bks. starttime >= '2012-09-14'
AND bks. starttime < '2012-09-15'



ORDER BY cost DESC
  ) AS bookings
  WHERE cost >30
  ORDER BY cost DESC;

