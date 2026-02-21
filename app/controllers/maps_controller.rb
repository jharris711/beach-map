class MapsController < ApplicationController
    def index
        @states  = CarmenService.get_all_states()
        state    = params[:state].to_s

        if state.present?
            puts "********************STATE: #{state}"
            geo = GeocoderService.search(state).first
            @location = geo ? {
                latitude:  geo.latitude,
                longitude: geo.longitude,
                bounds:    geo.boundingbox,
                name:      geo.display_name
            }.to_json : {}.to_json
            puts "*$*$*$*$*$*$*$*$*$*$*$*$*$ #{@location}"

            result = OverpassService.beaches_in_state state
            @beaches = result[:beaches]

            flash.now[:alert] = result[:error] if result[:error]
        else
            @beaches = []
            @location = nil
        end
    end
end
