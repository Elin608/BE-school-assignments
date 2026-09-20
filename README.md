# Parties API
A REST API built with Express and TypeScript.

## Endpoints
GET/parties
### Add a new party
POST/parties
{
    "name": "test",
    "leader": "Kilian",
    "seats": "100"
}
### Update a new party
PUT/parties/:id
{
    "seats": 100
}
### Delete party
DELETE/parties/:id
### Get totalseats
GET/parties/seats-total
