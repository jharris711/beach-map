require "net/http"
require "uri"
require "json"

class OverpassService
    ENDPOINT = "https://overpass-api.de/api/interpreter"

    def self.beaches_in_maryland(state)
        return { beaches: [], error: nil } if state.blank?

        query = <<~OVERPASS
            [out:json][timeout:25];
            area["name"="#{state}"]["admin_level"="4"]->.searchArea;
            (
                node["natural"="beach"](area.searchArea);
                way["natural"="beach"](area.searchArea);
                relation["natural"="beach"](area.searchArea);
            );
            out center;
            OVERPASS
        uri   = URI(ENDPOINT)

        begin
            response = Net::HTTP.post_form(uri, { "data" => query })
            beaches  = JSON.parse(response.body)["elements"]
            { beaches: beaches, error: nil }
        rescue JSON::ParserError => e
            error_msg = "Failed to parse Overpass API response: #{e.message}"
            Rails.logger.error error_msg
            Rails.logger.error "Response body: #{response&.body}"
            { beaches: [], error: error_msg }
        rescue StandardError => e
            error_msg = "Error fetching beaches from Overpass API: #{e.message}"
            Rails.logger.error error_msg
            { beaches: [], error: error_msg }
        end
    end
end
