require "geocoder"


class GeocoderService
    Geocoder.configure(http_headers: { "User-Agent" => "BeachMap/1.0 (test)" })

    def self.search(location)
        Geocoder.search(location)
    end
end
