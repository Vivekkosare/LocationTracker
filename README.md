# LocationTracker
<br/> LocationTracker is a project to track the geo coordinates of a location.
<br/> A service is searched in that location. (service is provided with geo location coordinates).
<br/> Distance is calculate between the geo coordinates of entered location and service.


How to run the app:
<br/>command: "npm start"

<br/> Input parameters:
<br/> Ex: 
<br/> {
<br/>     "service":"Salongens",
<br/>     "geoLocation":"huddinge"
<br/> }

<br/> Output:

<br/> {
<br/>    "message": "Geocoordinates fetched successfully",
<br/>     "post": {
<br/>         "totalHits": 1,
<br/>         "totalDocuments": 10,
<br/>         "results": [
<br/>             {
<br/>                 "id": 2,
<br/>                 "name": "Salongens massage",
<br/>                 "position": {
<br/>                     "lat": 59.3320299,
<br/>                     "lng": 18.023149800000056
<br/>                 },
<br/>                 "distance": "11.74 km",
<br/>                 "score": 4
<br/>             }
<br/>         ]
<br/>     }
<br/> }
