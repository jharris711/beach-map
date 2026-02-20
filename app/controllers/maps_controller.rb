class MapsController < ApplicationController
    def index
        @states  = CarmenService.get_all_states()
        state    = params[:state].to_s

        if state.present?
            result = OverpassService.beaches_in_state(state)
            @beaches = result[:beaches]
            flash.now[:alert] = result[:error] if result[:error]
        else
            @beaches = []
        end
    end
end
