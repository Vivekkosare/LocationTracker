const opencage = require('opencage-api-client');
const file = require('../data/data.json');

exports.getGeoCoordinates = async (req, res, next) => {
    let results = [];
    let responseKey = req.body.geoLocation;
    console.log(file);
    console.log('responseKey: ', responseKey);

    await opencage.geocode({ q: req.body.geoLocation, key: process.env.OCD_API_KEY })
        .then(data => {

            const geometry = data.results.shift().geometry;
            console.log(geometry);

            const serviceData = file.filter(service => service.name.includes(req.body.service));
            console.log('serviceData: ', serviceData);

            console.log('serviceData Length: ', serviceData.length);

            serviceData.forEach(element => {
                const serviceLat = element.position.lat;
                console.log('serviceLat: ', serviceLat);
                const serviceLng = element.position.lng;
                console.log('serviceLng: ', serviceLng);

                const locationLat = geometry.lat;
                console.log('locationLat: ', locationLat);
                const locationLng = geometry.lng;
                console.log('locationLng: ', locationLng);

                //calculates the distance between two locations
                const distanceCalculated = this.distance(serviceLat, serviceLng, locationLat, locationLng, 'K');

                console.log('distanceCalculated: ', distanceCalculated);

                //calculates the score as per the distance
                const score = this.score(distanceCalculated);
                console.log('score: ', score);

                const resultData = {
                    "id": element.id,
                    "name": element.name,
                    "position": element.position,
                    "distance": distanceCalculated.toFixed(2) + ' km',
                    "score": score
                };
                results.push(resultData);

            });
            res.status(200).json({
                message: 'Geocoordinates fetched successfully',
                post: {
                    "totalHits": serviceData.length,
                    "totalDocuments": file.length,
                    "results": results
                }
            });
        })
        .catch(err => {
            console.log(err);
        })

}

//calculates the distance between two locations
exports.distance = (lat1, lon1, lat2, lon2, unit) => {
    console.log('distance method called');
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}


//calculates the score as per the distance
exports.score = (distance) => {
    let scoreAchieved = 0;

    if (distance < 0.25)
        scoreAchieved = 10;
    else if (distance < 0.5)
        scoreAchieved = 9;
    else if (distance < 1)
        scoreAchieved = 8;
    else if (distance < 5)
        scoreAchieved = 7;
    else if (distance < 7.5)
        scoreAchieved = 6;
    else if (distance < 10)
        scoreAchieved = 5;
    else if (distance < 15)
        scoreAchieved = 4;
    else if (distance < 20)
        scoreAchieved = 3;
    else if (distance < 25)
        scoreAchieved = 2;
    else if (distance >= 25 && distance < 400)
        scoreAchieved = 1;
    else if (distance >= 400)
        scoreAchieved = 0;

    return scoreAchieved;
}

