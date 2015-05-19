class Place < ActiveRecord::Base
	geocoded_by :full_address
	after_validation :geocode

	def full_address
		"#{address}, #{city}, CA"
	end
end
