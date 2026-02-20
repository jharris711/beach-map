require "carmen"
include Carmen

class CarmenService
    def self.get_all_states
        us     = Country.named "United States"
        states = us.subregions
    end
end
