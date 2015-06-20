var _ = require('underscore');

module.exports = function (app) {
    app.post('/api/filter', function (req, res) {
        console.log(req.rawBody);

        var Validator = require('jsonschema').Validator;
        var v = new Validator();
        var jso = req.rawBody;
        var newjso = JSON.parse(req.rawBody);
        var schema={
            "description": "A payload",
            "type": "object",
            "properties":
            {
                "totalRecords": {"type":"number"},
                "skip": {"type":"number"},
                "take": {"type":"number"},
                "payload":
                {
                    "type": "array",
                    "items":
                    {"type":"object",
                        "properties":
                        {
                            "country": {"type":"string"},
                            "description": {"type":"string"},
                            "drm" :{"type":"boolean"},
                            "episodeCount" :{"type":"number"},
                            "genre" :{"type":"string"},
                            "image" :
                            {"type":"object",
                                "properties":
                                {
                                    "showImage":{"type":"string"}
                                },
                                "additionalProperties": false
                            },
                            "language" :{"type":"string"},
                            "nextEpisode" :
                            {"type":[ "object", "null"],
                                "properties":
                                {
                                    "channel": { "type": [ "string", "null"] },
                                    "channelLogo": { "type": [ "string", "null"] },
                                    "date": { "type": [ "string", "null"] },
                                    "html": { "type": [ "string", "null"] },
                                    "url": { "type": [ "string", "null"] }
                                },
                                "additionalProperties": false
                            },
                            "primaryColour" :{"type":"string"},
                            "seasons":
                            {
                                type:[ "array", "null"],
                                "items":
                                {"type":"object",
                                    "properties":
                                    {
                                        "slug" :{"type":"string", "required": true}
                                    },
                                    "additionalProperties": false
                                }
                            },
                            "slug" :{"type":"string", "required": true},
                            "title":{"type":"string", "required": true},
                            "tvChannel":{"type":"string"}
                        },"additionalProperties": false
                    },
                    "additionalProperties": false
                }
            }
            ,"additionalProperties": false
        };

        var result = v.validate(newjso, schema);
        console.log(result);
        if (result.errors.length > 0) {
            res.setHeader('content-type', 'application/json');
            res.status(400);
            res.json({
                "error": "Could not decode request: JSON parsing failed"
            });
        }
        else
        {
            var resp = _.filter(_.where(newjso.payload, {drm: true}), function (item) {
                return item.episodeCount > 0
            });

            var newArray = [];
            resp.forEach(function (item) {
                var newItem = _.pick(item, 'image', 'slug', 'title');
                newItem.image = _.propertyOf(newItem.image)('showImage');
                newArray.push(newItem);
            })

            res.setHeader('content-type', 'application/json');
            res.status(200);
            res.json(newArray);
        }
    })
}